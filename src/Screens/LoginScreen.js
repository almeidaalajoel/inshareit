import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {googleSignIn, signInWithEmail, signUpWithEmail} from '../firebase';
import {DataContext} from '../contexts';

import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [userText, setUserText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [confirmPasswordText, setConfirmPasswordText] = useState('');
  const [signUp, setSignUp] = useState(true);
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();

  const styles = {
    container: {flex: 1},
    googleButton: {
      width: (4 / 5) * width,
      height: height / 13,
      alignSelf: 'center',
    },
    input: {
      borderColor: 'lightgray',
      borderWidth: 1,
      width: (4 / 5) * width,
      borderRadius: 10,
      paddingLeft: 15,
      color: 'black',
      //height: height / 15,
    },
    button: {
      backgroundColor: 'rgb(18, 89, 150)',
      width: (4 / 5) * width,
      borderRadius: 10,
      height: height / 13,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
    },
    itemContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 15,
      //borderWidth: 1,
    },
    promptText: {
      marginLeft: (0.7 / 5) * width,
      color: 'rgb(190, 190, 190)',
      fontWeight: 'bold',
      alignSelf: 'flex-start',
    },
    bigText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      marginTop: 10,
    },
    toggle: {
      color: 'blue',
      textAlign: 'center',
      marginTop: 15,
    },
    tosLink: {
      color: 'blue',
      fontSize: 12,
    },
    tos: {
      fontSize: 12,
      color: 'gray',
    },
    separator: {
      flex: 0.2,
    },
    row: {
      flexDirection: 'row',
    },
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.bigText}>{signUp ? 'Sign Up' : 'Sign In'}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.promptText}>Email</Text>
        <TextInput
          style={styles.input}
          value={userText}
          onChangeText={setUserText}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.itemContainer}>
        <Text style={styles.promptText}>Password</Text>
        <TextInput
          style={styles.input}
          value={passwordText}
          secureTextEntry={true}
          onChangeText={setPasswordText}
        />
      </View>
      <View style={styles.separator} />
      {signUp ? (
        <View style={styles.itemContainer}>
          <Text style={styles.promptText}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPasswordText}
            secureTextEntry={true}
            onChangeText={setConfirmPasswordText}
          />
        </View>
      ) : (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () =>
              signInWithEmail(userText.trim().toLowerCase(), passwordText)
            }>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
      {signUp ? <View style={styles.separator} /> : null}
      {signUp ? (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (passwordText !== confirmPasswordText)
                Alert.alert("Passwords don't match!");
              else if (userText.length > 50)
                Alert.alert('Email address must be less than 50 characters');
              else signUpWithEmail(userText.trim().toLowerCase(), passwordText);
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={styles.tos}>By signing up you agree to our</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TOS')}>
              <Text style={styles.tosLink}> Terms of Service </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.itemContainer} />
      )}
      <View style={styles.itemContainer}>
        <Text>or</Text>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn}
        />
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => setSignUp(prevSign => !prevSign)}>
          <Text style={styles.toggle}>
            {signUp
              ? 'Already have an account? Sign in'
              : 'Need an account? Sign up'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
