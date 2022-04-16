/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import Router from './Router';
import {getAuthStateSubscriber} from './firebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = getAuthStateSubscriber(setInitializing, setUser);
    return subscriber;
  }, []);

  return (
    <Router
      user={user}
      initializing={initializing}
      setInitializing={setInitializing}
    />
  );
};

export default App;
