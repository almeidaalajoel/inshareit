/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import HomeScreen from './src/Screens/HomeScreen';
import LoginScreen from './src/Screens/LoginScreen';
import CollectionsScreen from './src/Screens/CollectionsScreen';
import CategoryScreen from './src/Screens/CategoryScreen';
import UploadScreen from './src/Screens/UploadScreen';
import ItemScreen from './src/Screens/ItemScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import InviteScreen from './src/Screens/InviteScreen';
import TOSScreen from './src/Screens/TOSScreen';

import {
  getUserSnapshot,
  getCollectionSnapshot,
  getInviteSnapshot,
} from './firebase';
import {
  CategoryContext,
  CollectionContext,
  DataContext,
  InviteContext,
  UserContext,
} from './contexts';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateCollectionScreen from './src/Screens/CreateCollectionScreen';

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
    <UserContext.Provider
      value={{
        userSnapshot,
        setUserSnapshot,
        initializing,
        setInitializing,
      }}>
      <InviteContext.Provider
        value={{
          inviteSnapshot,
          setInviteSnapshot,
          invites,
          setInvites,
        }}>
        <CollectionContext.Provider
          value={{
            collectionSnapshot,
            setCollectionSnapshot,
            collections,
            setCollections,
          }}>
          <CategoryContext.Provider
            value={{
              categoryImages,
              categoryItems,
              setCategoryImages,
              setCategoryItems,
              currentItem,
              setCurrentItem,
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
                    <Stack.Screen
                      name="Collections"
                      component={CollectionsScreen}
                    />
                    <Stack.Screen name="Category" component={CategoryScreen} />
                    <Stack.Screen
                      name="Upload New Item"
                      component={UploadScreen}
                    />
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
          </CategoryContext.Provider>
        </CollectionContext.Provider>
      </InviteContext.Provider>
    </UserContext.Provider>
  );
};

export default Router;
