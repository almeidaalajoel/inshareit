/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import CollectionsScreen from './Screens/CollectionsScreen';
import CategoryScreen from './Screens/CategoryScreen';
import UploadScreen from './Screens/UploadScreen';
import ItemScreen from './Screens/ItemScreen';
import ProfileScreen from './Screens/ProfileScreen';
import InviteScreen from './Screens/InviteScreen';
import TOSScreen from './Screens/TOSScreen';

import {
  getUserSnapshot,
  getCollectionSnapshot,
  getInviteSnapshot,
} from './firebase';
import {DataContext} from './contexts';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateCollectionScreen from './Screens/CreateCollectionScreen';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const Router = ({user, initializing, setInitializing}) => {
  const [userSnapshot, setUserSnapshot] = useState(null);
  const [inviteSnapshot, setInviteSnapshot] = useState(null);
  const [collectionSnapshot, setCollectionSnapshot] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [categoryImages, setCategoryImages] = useState([]);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const inviteUnsub = getInviteSnapshot(setInviteSnapshot, user?.email);
    return inviteUnsub;
  }, [user]);

  useEffect(() => {
    const userUnsub = getUserSnapshot(setUserSnapshot, user?.email);
    return userUnsub;
  }, [user]);

  useEffect(() => {
    const collectionUnsub = getCollectionSnapshot(
      setCollectionSnapshot,
      user?.email,
      userSnapshot?.defaultCollection?.collectionId,
    );
    return collectionUnsub;
  }, [userSnapshot?.defaultCollection?.collectionId, user]);

  return (
    <DataContext.Provider
      value={{
        userSnapshot,
        inviteSnapshot,
        collectionSnapshot,
        categoryImages,
        initializing,
        collections,
        currentItem,
        categoryItems,
        invites,
        setInvites,
        setCategoryItems,
        setCurrentItem,
        setCollections,
        setInitializing,
        setUserSnapshot,
        setInviteSnapshot,
        setCollectionSnapshot,
        setCategoryImages,
      }}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="Create Collection"
                component={CreateCollectionScreen}
              />
              <Stack.Screen name="Collections" component={CollectionsScreen} />
              <Stack.Screen name="Category" component={CategoryScreen} />
              <Stack.Screen name="Upload New Item" component={UploadScreen} />
              <Stack.Screen name="Item" component={ItemScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Invite" component={InviteScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen name="TOS" component={TOSScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
};

export default Router;
