/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';

import CategoriesScreen from './CategoriesScreen';
import AllItemsScreen from './AllItemsScreen';
import CollectionName from '../Components/CollectionName';
import {
  CategoryContext,
  CollectionContext,
  InviteContext,
  UserContext,
} from '../contexts';
import {setUserCollectionImage} from '../firebase';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, View} from 'react-native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {setCategoryImages} = useContext(CategoryContext);
  const {collectionSnapshot} = useContext(CollectionContext);
  const {userSnapshot} = useContext(UserContext);
  const {setInvites, inviteSnapshot} = useContext(InviteContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <CollectionName
          collectionName={userSnapshot?.defaultCollection?.collectionName}
        />
      ),
      headerRight: () => (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Feather name="user" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  useEffect(() => {
    if (inviteSnapshot) {
      const tempInvites = JSON.parse(
        JSON.stringify(Object.values(inviteSnapshot)),
      );
      setInvites(tempInvites.reduce((prev, curr) => [...prev, ...curr], []));
    } else setInvites([]);
  }, [inviteSnapshot]);

  useEffect(() => {
    if (collectionSnapshot)
      setCategoryImages(
        JSON.parse(
          JSON.stringify(Object.entries(collectionSnapshot.categories)),
        ).sort((a, b) => (a[0] > b[0] ? 1 : -1)),
      );
    else setCategoryImages([]);
  }, [collectionSnapshot]);

  useEffect(() => {
    const setUserCollectionURL = async () => {
      const {
        defaultCollection: {collectionId},
      } = userSnapshot;
      const userCollectionImage =
        userSnapshot.collections[collectionId]?.collectionImage;
      if (collectionSnapshot.collectionImage && !userCollectionImage)
        await setUserCollectionImage(
          collectionSnapshot.collectionImage,
          collectionId,
          userSnapshot.email,
        );
    };

    if (userSnapshot && collectionSnapshot) setUserCollectionURL();
  }, [collectionSnapshot]);

  return (
    <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true}}>
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Material name="folder-open-outline" size={25} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="All Items"
        component={AllItemsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Material name="grid" size={25} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
