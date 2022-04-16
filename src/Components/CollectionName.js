import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function CollectionName(props) {
  const navigation = useNavigation();

  const styles = {
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
    },
    innerRow: {flexDirection: 'row', width: '50%', alignItems: 'center'},
    text: {fontWeight: 'bold', color: 'black'},
    icon: {marginLeft: 20},
  };

  return (
    <View style={styles.row}>
      <View style={styles.innerRow}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Collections')}>
            <View style={styles.row}>
              <Text style={styles.text}>{props.collectionName}</Text>
              {props.collectionName ? null : (
                <Text style={styles.text}>Create</Text>
              )}
              <Feather
                name="chevron-down"
                size={20}
                style={styles.icon}
                color="black"
              />
            </View>
          </TouchableOpacity>
          {props.collectionName ? (
            <TouchableOpacity onPress={() => navigation.navigate('Invite')}>
              <Feather
                style={styles.icon}
                name="user-plus"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}
