import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useContext} from 'react';

import Invite from '../Components/Invite';
import {signOut} from '../firebase';
import {UserContext, InviteContext} from '../contexts';

import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const {userSnapshot} = useContext(UserContext);
  const {invites} = useContext(InviteContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={signOut}>
            <Feather name="log-out" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  const renderItem = ({item}) => {
    return <Invite invite={item} email={userSnapshot.email} />;
  };

  return invites.length > 0 ? (
    <View style={styles.container}>
      {invites && userSnapshot ? (
        <FlatList data={invites} renderItem={renderItem} />
      ) : null}
    </View>
  ) : (
    <View style={styles.altPage}>
      <Text>No pending invites... Yet!</Text>
    </View>
  );
};

const styles = {
  container: {flex: 1},
  altPage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};

export default ProfileScreen;
