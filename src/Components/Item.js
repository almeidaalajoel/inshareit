import React, {useState, useEffect, useContext} from 'react';
import {View, useWindowDimensions, TouchableOpacity} from 'react-native';

import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {ItemContext} from '../contexts';

export default function Item(props) {
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const {setCurrentItem} = useContext(ItemContext);

  const {item} = props;

  useEffect(() => {
    if (props.index % 3 === 0) setPaddingRight(3);

    if (props.index % 3 === 2) setPaddingLeft(3);
  }, [props.index]);

  const styles = {
    paddedContainer: {
      height: height / 6,
      width: width / 3,
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      paddingBottom: 3,
    },
    image: {height: '100%', width: '100%'},
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setCurrentItem(JSON.parse(JSON.stringify(item)));
        navigation.navigate('Item');
      }}>
      <View style={styles.paddedContainer}>
        <FastImage
          source={{uri: item.imageURL}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
    </TouchableOpacity>
  );
}
