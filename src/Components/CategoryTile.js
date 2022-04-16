import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {useWindowDimensions, View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function CategoryTile(props) {
  const {height, width} = useWindowDimensions();
  const [marginLeft, setMarginLeft] = useState(0);
  const [marginRight, setMarginRight] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    if (props.index % 2 === 0) {
      setMarginLeft(10);
      setMarginRight(5);
    } else {
      setMarginLeft(5);
      setMarginRight(10);
    }
  }, [props.index]);

  const styles = {
    tile: {
      width: width / 2,
      height: height / 3.92,
      marginTop: 5,
      marginBottom: 15,
    },
    textContainer: {
      flex: 1,
    },
    text: {
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
    },
    imageContainer: {
      flex: 9,
      marginLeft,
      marginRight,
      borderRadius: 15,
      borderWidth: props.imageURL ? 0 : 0.5,
      borderColor: 'lightgray',
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: 15,
    },
  };

  return (
    <TouchableOpacity
      onPress={() => {
        const {category} = props;
        navigation.navigate('Category', {category: category});
      }}>
      <View style={styles.tile}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.category}</Text>
        </View>
        <View style={styles.imageContainer}>
          <FastImage
            source={{uri: props.imageURL}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
