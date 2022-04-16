import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React from 'react';

import {acceptInvite, rejectInvite} from '../firebase';

import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const Invite = ({invite, email}) => {
  const {width, height} = useWindowDimensions();
  //console.log(invite);
  const styles = {
    row: {
      flexDirection: 'row',
      height: height / 7,
      alignItems: 'center',
      paddingLeft: width / 35,
      //   borderWidth: 1,
    },
    smallRow: {flexDirection: 'row', justifyContent: 'space-evenly'},
    collectionName: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'black',
      marginBottom: 5,
    },
    creator: {
      fontSize: 13,
      marginBottom: 5,
    },
    image: {
      height: height / 9,
      width: height / 9,
      borderRadius: 15,
    },
    column: {
      //width: 0,
      //flexGrow: 1,
      paddingHorizontal: width / 35,
      //height: height / 7,
      //borderWidth: 1,
      justifyContent: 'space-evenly',
    },
    accept: {
      borderWidth: 1,
      width: width / 4,
      height: height / 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'green',
    },
    reject: {
      borderWidth: 1,
      width: width / 4,
      height: height / 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'red',
    },
  };

  return (
    <View>
      <View style={styles.row}>
        <FastImage
          source={{uri: invite.collectionImage}}
          style={styles.image}
        />
        <View style={styles.column}>
          <Text style={styles.collectionName}>{invite.collectionName}</Text>
          <Text style={styles.creator}>Invited by: {invite.inviterEmail}</Text>
          <Text style={styles.creator}>Owner: {invite.owner}</Text>
        </View>
      </View>
      <View style={styles.smallRow}>
        <TouchableOpacity onPress={() => acceptInvite(email, invite)}>
          <View style={styles.accept}>
            <Feather name="check" color="green" size={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => rejectInvite(email, invite)}>
          <View style={styles.reject}>
            <Feather name="x" color="red" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Invite;
