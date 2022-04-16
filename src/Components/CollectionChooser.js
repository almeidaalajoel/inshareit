import React from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';

import {changeCollection} from '../firebase';

import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const CollectionChooser = props => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();

  const styles = {
    row: {
      flexDirection: 'row',
      height: height / 7,
      alignItems: 'center',
      paddingLeft: width / 35,
    },
    collectionName: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'black',
    },
    creator: {
      fontSize: 13,
    },
    image: {
      height: height / 9,
      width: height / 9,
      borderRadius: 15,
    },
    column: {
      width: 0,
      flexGrow: 1,
      paddingHorizontal: width / 35,
      height: height / 7,
      justifyContent: 'space-evenly',
    },
  };

  return (
    <TouchableOpacity
      onPress={() => {
        changeCollection(props.email, props.collectionId, props.collectionName);
        navigation.pop();
      }}>
      <View style={styles.row}>
        <FastImage source={{uri: props.image}} style={styles.image} />
        <View style={styles.column}>
          <Text style={styles.collectionName}>{props.collectionName}</Text>
          <Text style={styles.creator}>Owner: {props.owner}</Text>
        </View>
      </View>
      {/* <View style={styles.seperator} /> */}
    </TouchableOpacity>
  );
};

export default CollectionChooser;
