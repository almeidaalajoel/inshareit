import React from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

const AddRow = props => {
  const windowHeight = Dimensions.get('window').height;
  const styles = {
    row: {
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'row',
      height: windowHeight / 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return props.adding ? null : (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          props.addCategory();
          props.setAdding(true);
        }}>
        <Feather name="plus-circle" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AddRow;
