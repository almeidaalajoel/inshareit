import React, {useState} from 'react';
import {View, Text, Dimensions, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const NewCategory = props => {
  const windowHeight = Dimensions.get('window').height;
  const [text, setText] = useState('');

  const styles = {
    row: {
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'row',
      height: windowHeight / 12,
      alignItems: 'center',
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 30,
      includeFontPadding: false,
      color: 'black',
    },
    icon: {
      marginLeft: 20,
    },
    input: {
      height: 40,
      marginLeft: 25,
      //borderWidth: 1,
      //padding: 10,
      flex: 0.7,
      color: 'black',
    },
    x: {
      marginLeft: 'auto',
    },
    padder: {
      width: 32.5,
    },
  };

  if (!props.name)
    return (
      <View style={styles.row}>
        <View style={styles.padder} />
        <TextInput
          autoFocus={true}
          value={text}
          onChangeText={setText}
          placeholder="New Category"
          style={styles.input}
          onSubmitEditing={() => {
            if (text) {
              props.commitCategory(props.index, text);
              props.setAdding(false);
            }
          }}
        />
        <Feather
          style={styles.x}
          onPress={() => {
            props.removeCategory(props.index);
            props.setAdding(false);
          }}
          color="red"
          name="x"
          size={20}
        />
      </View>
    );
  else
    return (
      <View style={styles.row}>
        {props.icon ? (
          <Icon name={props.icon} size={30} color="black" />
        ) : (
          <View style={styles.padder} />
        )}
        <Text style={styles.text}>
          {props.name.length > 30
            ? props.name.slice(0, 31) + '.....'
            : props.name}
        </Text>
        <View style={styles.x}>
          <Feather
            onPress={() => {
              props.removeCategory(props.index);
            }}
            color="red"
            name="x"
            size={20}
          />
        </View>
      </View>
    );
};

export default NewCategory;
