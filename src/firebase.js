import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {UserSecondFactorDeviceMethod} from 'expo-cli/build/commands/auth/accounts';

GoogleSignin.configure({
  webClientId:
    '811417455643-cje7ljfvush1t95b0sn798s2q49qbpbf.apps.googleusercontent.com',
});

const db = firestore();
const usersRef = db.collection('users');
const userInvitationsRef = db.collection('userInvitations');
const collectionsRef = db.collection('collections');

const getAuthStateSubscriber = (setInitializing, setUser) => {
  const onAuthStateChanged = user => {
    setUser(user);
    setInitializing(false);
  };
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber;
};

const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const {accessToken, idToken} = await GoogleSignin.signIn();
    const credential = auth.GoogleAuthProvider.credential(idToken, accessToken);
    const {user} = await auth().signInWithCredential(credential);
    const userDoc = await usersRef.doc(user.email).get();
    if (!userDoc._exists) {
      await usersRef.doc(user.email).set({
        email: user.email,
        displayname: user.displayName,
        uid: user.uid,
        collections: [],
        defaultCollection: {},
      });
      await userInvitationsRef.doc(user.email).set({});
    }
  } catch (error) {
    console.log(error);
  }
};

const signUpWithEmail = async (userText, passwordText) => {
  const {user} = await auth().createUserWithEmailAndPassword(
    userText,
    passwordText,
  );
  const userDoc = await usersRef.doc(user.email).get();
  if (!userDoc._exists) {
    await usersRef.doc(user.email).set({
      email: user.email,
      displayname: user.displayName,
      uid: user.uid,
      collections: [],
      defaultCollection: {},
    });
    await userInvitationsRef.doc(user.email).set({});
    return false;
  }
};

const signInWithEmail = async (userText, passwordText) => {
  await auth().signInWithEmailAndPassword(userText, passwordText);
  const userDoc = await usersRef.doc(userText).get();
  return userDoc._data.agreedToTOS;
};

const signOut = () => {
  auth().signOut();
};

const getUserSnapshot = (setUserSnapshot, email) => {
  if (!email) return () => {};
  return usersRef.doc(email).onSnapshot(snap => {
    setUserSnapshot(snap ? snap._data : null);
  });
};

const getInviteSnapshot = (setInviteSnapshot, email) => {
  if (!email) return () => {};
  return userInvitationsRef.doc(email).onSnapshot(snap => {
    setInviteSnapshot(snap ? snap._data : null);
  });
};

const getCollectionSnapshot = (
  setCollectionSnapshot,
  email,
  defaultCollectionId,
) => {
  if (!email || !defaultCollectionId) {
    setCollectionSnapshot(null);
    return () => {};
  }
  return collectionsRef.doc(defaultCollectionId).onSnapshot(snap => {
    setCollectionSnapshot(snap ? snap._data : null);
  });
};

const createCollection = async (
  collectionName,
  categories,
  collections,
  email,
  uid,
) => {
  const collectionId = uid + collectionName;
  const collectionObj = {
    owner: email,
    members: [email],
    collectionName,
    categories,
    items: [],
    collectionImage: '',
  };
  await collectionsRef.doc(collectionId).set(collectionObj);

  const userCollection = {
    collectionId,
    collectionName,
    collectionImage: '',
    owner: email,
  };
  await usersRef.doc(email).update({
    [`collections.${collectionId}`]: userCollection,
    defaultCollection: {collectionId, collectionName},
  });
};

const getURL = async image => {
  const downloadURL = await storage()
    .ref('/' + image)
    .getDownloadURL();
  return downloadURL;
};

const addItem = async (
  imageURL,
  filename,
  collectionId,
  category,
  description,
  collectionName,
  categoryImage,
  collectionImage,
  email,
) => {
  const time = Date.now();

  const items = firestore.FieldValue.arrayUnion({
    imageURL,
    description,
    collectionName,
    time,
    image: filename,
    visibleLikes: [],
    invisibleLikes: [],
    key: time + collectionName + filename,
    category,
    uploader: email,
    comments: [],
  });

  let obj = {};
  if (categoryImage && collectionImage)
    obj = {
      items,
    };
  else if (!categoryImage && collectionImage)
    obj = {
      items,
      [`categories.${category}`]: imageURL,
    };
  else if (categoryImage && !collectionImage)
    obj = {
      items,
      collectionImage: imageURL,
    };
  else
    obj = {
      items,
      collectionImage: imageURL,
      [`categories.${category}`]: imageURL,
    };

  await collectionsRef
    .doc(collectionId)
    .update(obj)
    .catch(err => {
      console.log(err);
    });
};

const uploadImage = async (uri, filename, uploadUri) => {
  const task = storage().ref(filename).putFile(uploadUri);
  try {
    await task;
  } catch (e) {
    console.error(e);
  }
};

const changeCollection = async (email, collectionId, collectionName) => {
  await usersRef.doc(email).update({
    defaultCollection: {collectionId, collectionName},
  });
};

const setUserCollectionImage = async (collectionImage, collectionId, email) => {
  if (collectionId)
    await usersRef.doc(email).update({
      [`collections.${collectionId}.collectionImage`]: collectionImage,
    });
};

const postComment = async (
  collectionId,
  comment,
  commenter,
  currentItem,
  setCurrentItem,
) => {
  const updatedItem = JSON.parse(JSON.stringify(currentItem));
  const time = Date.now();
  const newComment = {time, comment, commenter};
  updatedItem.comments.push(newComment);
  setCurrentItem(updatedItem);
  await collectionsRef.doc(collectionId).update({
    items: firestore.FieldValue.arrayRemove(currentItem),
  });
  collectionsRef.doc(collectionId).update({
    items: firestore.FieldValue.arrayUnion(updatedItem),
  });
};

const sendInvite = async (
  inviterUid,
  inviterEmail,
  invitedEmail,
  collectionId,
  collectionName,
  owner,
  collectionImage,
) => {
  const invite = {
    [inviterUid]: firestore.FieldValue.arrayUnion({
      inviterUid,
      inviterEmail,
      collectionId,
      collectionName,
      owner,
      collectionImage,
    }),
  };
  await userInvitationsRef.doc(invitedEmail).update(invite);
  await collectionsRef
    .doc(collectionId)
    .update({members: firestore.FieldValue.arrayUnion(invitedEmail)});
};

const acceptInvite = async (email, invite) => {
  const {inviterUid, collectionId, collectionName, owner, collectionImage} =
    invite;
  usersRef.doc(email).update({
    [`collections.${collectionId}`]: {
      collectionId,
      collectionName,
      owner,
      collectionImage,
    },
  });
  usersRef.doc(email).update({
    defaultCollection: {collectionId, collectionName},
  });
  userInvitationsRef.doc(email).update({
    [inviterUid]: firestore.FieldValue.arrayRemove(invite),
  });
};

const rejectInvite = async (email, invite) => {
  const {inviterUid, collectionId} = invite;
  collectionsRef
    .doc(collectionId)
    .update({members: firestore.FieldValue.arrayRemove(email)});
  userInvitationsRef.doc(email).update({
    [inviterUid]: firestore.FieldValue.arrayRemove(invite),
  });
};

const report = async (collectionId, uid, key) => {
  collectionsRef
    .doc(collectionId)
    .update({[`reports.${uid}`]: firestore.FieldValue.arrayUnion(key)});
};

export {
  getAuthStateSubscriber,
  googleSignIn,
  signUpWithEmail,
  signInWithEmail,
  signOut,
  getUserSnapshot,
  getInviteSnapshot,
  getCollectionSnapshot,
  createCollection,
  getURL,
  addItem,
  uploadImage,
  changeCollection,
  setUserCollectionImage,
  postComment,
  sendInvite,
  acceptInvite,
  rejectInvite,
  report,
};
