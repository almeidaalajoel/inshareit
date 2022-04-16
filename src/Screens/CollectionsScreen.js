import React, {useContext, useEffect} from 'react';
import {FlatList, SafeAreaView, TouchableOpacity} from 'react-native';

import {UserContext} from '../contexts';

import {useNavigation} from '@react-navigation/native';
import CollectionChooser from '../Components/CollectionChooser';
import Feather from 'react-native-vector-icons/Feather';

const CollectionsScreen = () => {
  const {userSnapshot} = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() =>
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Create Collection');
          }}>
          <Feather name="plus-square" size={25} color="black" />
        </TouchableOpacity>
      ),
    }),
  );

  const renderItem = ({item}) => {
    return userSnapshot.defaultCollection.collectionId ===
      item.collectionId ? null : (
      <CollectionChooser
        email={userSnapshot.email}
        collectionId={item.collectionId}
        collectionName={item.collectionName}
        image={item.collectionImage}
        owner={item.owner}
      />
    );
  };
  return (
    <SafeAreaView>
      {userSnapshot?.defaultCollection ? (
        <FlatList
          data={JSON.parse(
            JSON.stringify(Object.values(userSnapshot.collections)),
          )}
          renderItem={renderItem}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default CollectionsScreen;
