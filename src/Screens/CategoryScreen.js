import React, {useContext, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';

import {DataContext} from '../contexts';
import Item from '../Components/Item';

import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const CategoryScreen = ({route}) => {
  const {collectionSnapshot, categoryItems, setCategoryItems} =
    useContext(DataContext);
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const category = route.params.category;

  useEffect(() => {
    if (collectionSnapshot) {
      setCategoryItems(
        [...collectionSnapshot.items]
          .filter(item => item.category === category)
          .sort((a, b) => (a.time > b.time ? -1 : 1)),
      );
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Upload New Item', {
                category,
              });
            }}>
            <Feather name="plus-square" size={25} color="black" />
          </TouchableOpacity>
        ),
        title: category,
      });
    }
  }, [collectionSnapshot, navigation, category, setCategoryItems]);

  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

  const styles = {
    column: {justifyContent: 'flex-start'},
    padded: {padding: 20},
    container: {flex: 1},
    text: {
      fontWeight: 'bold',
      color: 'black',
      fontSize: 20,
      alignSelf: 'center',
    },
  };

  return collectionSnapshot ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        columnWrapperStyle={styles.column}
        data={categoryItems}
        renderItem={renderItem}
        numColumns={3}
        extraData={collectionSnapshot.items}
      />
    </SafeAreaView>
  ) : null;
};

export default CategoryScreen;
