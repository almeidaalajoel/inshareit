import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import {addItem, getURL, uploadImage} from '../firebase';
import {CollectionContext, UserContext} from '../contexts';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const UploadScreen = ({navigation, route}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {collectionSnapshot} = useContext(CollectionContext);
  const {width, height} = useWindowDimensions();
  const [finished, setFinished] = useState(false);
  const {userSnapshot} = useContext(UserContext);

  useEffect(
    () =>
      navigation.setOptions({
        headerRight: () =>
          image ? (
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                upload();
              }}>
              <Feather name="check" size={25} color="black" />
            </TouchableOpacity>
          ) : null,
      }),
    [image, navigation, title, description],
  );

  const selectLibraryImage = () => {
    const options = {
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        //console.log(response);
        const source = {uri: response.assets[0].uri};
        //console.log(source);
        setImage(source);
      }
    });
  };

  const selectNewImage = () => {
    const options = {
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        setImage(source);
      }
    });
  };

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const upload = async () => {
    if (image === null) {
      Alert.alert('No image chosen');
      return;
    }
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    await uploadImage(uri, filename, uploadUri, setUploading); //uploads to cloud storage
    const imageURL = await getURL(filename);
    const {category} = route.params;
    const categoryImage = collectionSnapshot.categories[category];
    const collectionImage = collectionSnapshot.collectionImage;
    const collectionId = userSnapshot.defaultCollection.collectionId;
    await addItem(
      imageURL,
      filename,
      collectionId,
      category,
      description,
      title,
      categoryImage,
      collectionImage,
      userSnapshot.email,
    ); //adds to firestore database
    setUploading(false);
    setFinished(true);
    await wait(1000);
    setFinished(false);
    setImage(null);
    setTitle('');
    setDescription('');
  };

  const styles = {
    containerNoImage: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 45,
    },
    container: {flex: 1},
    addRow: {
      borderColor: 'red',
      flexDirection: 'row',
    },
    addButton: {
      flex: 1,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    prompt: {
      color: 'black',
    },
    imageContainer: {
      width: width / 2,
      height: width / 2,
      paddingHorizontal: 15,
    },
    bottom: {
      paddingHorizontal: 20,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    title: {
      borderBottomWidth: 0.5,
      color: 'black',
    },
    top: {
      flexDirection: 'row',
      paddingTop: 10,
    },
    infoBox: {flex: 1, paddingRight: 15},
    description: {
      flex: 1,
      justifyContent: 'flex-start',
      textAlignVertical: 'top',
      borderBottomWidth: 0.5,
      color: 'black',
    },
    loader: {
      position: 'absolute',
      bottom: height / 20,
      alignSelf: 'center',
    },
  };

  return image === null ? (
    <SafeAreaView style={styles.containerNoImage}>
      <View style={styles.addRow}>
        <TouchableOpacity style={styles.addButton} onPress={selectNewImage}>
          <View style={styles.iconContainer}>
            <Feather name="camera" size={100} color="black" />
            <Text style={styles.prompt}>Take new picture</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={selectLibraryImage}>
          <View style={styles.iconContainer}>
            <Feather name="image" size={100} color="black" />
            <Text style={styles.prompt}>Choose from gallery</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => {
            setImage(null);
            setTitle('');
            setDescription('');
          }}
          style={styles.imageContainer}>
          <FastImage
            source={{uri: image.uri}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </TouchableOpacity>
        <View style={styles.infoBox}>
          <TextInput
            placeholder="Title (optional)"
            onChangeText={setTitle}
            value={title}
            style={styles.title}
          />
          <TextInput
            placeholder="Description (optional)"
            onChangeText={setDescription}
            multiline={true}
            blurOnSubmit={true}
            style={styles.description}
          />
        </View>
      </View>
      <View style={styles.bottom} />
      {uploading ? (
        <ActivityIndicator style={styles.loader} size={100} />
      ) : null}
      {finished ? (
        <Feather style={styles.loader} name="check" color="green" size={100} />
      ) : null}
    </SafeAreaView>
  );
};

export default UploadScreen;
