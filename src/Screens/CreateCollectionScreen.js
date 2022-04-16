import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';

import defaultCategories from '../DefaultCategories';
import NewCategory from '../Components/NewCategory';
import AddRow from '../Components/AddRow';
import {UserContext} from '../contexts';
import {createCollection} from '../firebase';

import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const CreateCollectionScreen = () => {
  const [categoriesArr, setCategoriesArr] = useState(defaultCategories);
  const [adding, setAdding] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState([]);
  const {userSnapshot} = useContext(UserContext);
  const listRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (userSnapshot) {
      const userCollections = userSnapshot.collections;
      const tempCollections = [];
      Object.keys(userCollections).forEach(collectionId => {
        tempCollections.push(collectionId);
      });
      setCollections(tempCollections);
    }
  }, [userSnapshot]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.titleRow}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              value={collectionName}
              onChangeText={setCollectionName}
              placeholder="Collection Name"
            />
          </View>
          {adding ? (
            <View style={styles.icon} />
          ) : (
            <TouchableOpacity
              onPress={async () => {
                if (validName()) {
                  const categories = {};
                  for (let i = 0; i < categoriesArr.length; i++)
                    categories[categoriesArr[i].name] = '';
                  await createCollection(
                    collectionName,
                    categories,
                    userSnapshot.collections,
                    userSnapshot.email,
                    userSnapshot.uid,
                  );
                  navigation.navigate('Home');
                }
              }}
              style={styles.icon}>
              <Feather name="check" size={25} color="black" />
            </TouchableOpacity>
          )}
        </View>
      ),
    });
  });

  const validName = () => {
    if (collectionName.length === 0) {
      Alert.alert('Your collection needs a name');
      return false;
    }
    if (collectionName.length > 50) {
      Alert.alert('Title must be less than 50 characters');
      return false;
    }
    if (collectionName.includes('/')) {
      Alert.alert('Invalid collection name: "/" is not allowed');
      return false;
    }
    if (RegExp('__.*__').test(collectionName)) {
      Alert.alert('Invalid collection name: "__.*__" is not allowed');
      return false;
    }
    if (collectionName === '.') {
      Alert.alert('Invalid collection name: title cannot be "."');
      return false;
    }
    if (collectionName === '..') {
      Alert.alert('Invalid collection name: title cannot be ".."');
      return false;
    }
    if (collections.includes(collectionName)) {
      Alert.alert('You already have a collection titled ' + collectionName);
      return false;
    }
    return true;
  };

  const removeCategory = index => {
    setCategoriesArr(prevCategories => {
      let copy = [...prevCategories];
      copy.splice(index, 1);
      return copy;
    });
  };

  const addCategory = () => {
    setCategoriesArr(prevCategories => {
      let copy = [...prevCategories];
      copy.push({});
      return copy;
    });
  };

  const commitCategory = (index, text) => {
    if (text.length > 20) {
      Alert.alert('Category name must be less than 20 characters');
      return;
    }
    setCategoriesArr(prevCategories => {
      let copy = [...prevCategories];
      copy[index].name = text;
      return copy;
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <NewCategory
        removeCategory={removeCategory}
        icon={item.icon}
        name={item.name}
        setAdding={setAdding}
        commitCategory={commitCategory}
        index={index}
      />
    );
  };

  const styles = {
    container: {flex: 1},
    flatList: {flex: 9},
    button: {flex: 1},
    icon: {flex: 1.55},
    inputText: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      marginRight: 38,
      color: 'black',
    },
    titleRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {flex: 4},
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatList}>
        <FlatList
          ListFooterComponent={
            <AddRow
              addCategory={addCategory}
              setAdding={setAdding}
              adding={adding}
            />
          }
          removeClippedSubviews={false}
          renderItem={renderItem}
          data={categoriesArr}
          onContentSizeChange={() => {
            listRef.current.scrollToEnd({animated: false});
          }}
          ref={listRef}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateCollectionScreen;
