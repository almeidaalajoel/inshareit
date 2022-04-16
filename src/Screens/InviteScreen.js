import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import {DataContext} from '../contexts';
import {sendInvite} from '../firebase';

import Feather from 'react-native-vector-icons/Feather';

const InviteScreen = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {userSnapshot, collectionSnapshot} = useContext(DataContext);

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const invite = async () => {
    if (collectionSnapshot.members.includes(text))
      Alert.alert('User is already a member of this collection');
    else if (text.length === 0) Alert.alert('No email address provided');
    else {
      Keyboard.dismiss();
      setLoading(true);
      await sendInvite(
        userSnapshot.uid,
        userSnapshot.email,
        text,
        userSnapshot.defaultCollection.collectionId,
        userSnapshot.defaultCollection.collectionName,
        collectionSnapshot.owner,
        collectionSnapshot.collectionImage,
      );
      setLoading(false);
      setSuccess(true);
      await wait(2000);
      setSuccess(false);
    }
  };

  return userSnapshot && collectionSnapshot ? (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.emailInput}
          value={text}
          onChangeText={setText}
          placeholder="email address"
        />
      </View>
      {loading ? <ActivityIndicator style={styles.loader} size={100} /> : null}
      {success ? (
        <Feather style={styles.loader} name="check" color="green" size={100} />
      ) : null}
      <TouchableOpacity style={styles.button} onPress={invite}>
        <Text style={styles.buttonText}>Send Invite</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.altPage}>
      <Text>Create a collection to start sending invites!</Text>
    </View>
  );
};

const styles = {
  buttonText: {fontSize: 22, fontWeight: 'bold', color: 'black'},
  loader: {
    position: 'absolute',
    bottom: 300,
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 20,
    height: 70,
  },
  container: {flex: 1, justifyContent: 'space-between', padding: 20},
  inputContainer: {paddingHorizontal: 10},
  emailInput: {borderBottomWidth: 0.5, color: 'black'},
  altPage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};

export default InviteScreen;
