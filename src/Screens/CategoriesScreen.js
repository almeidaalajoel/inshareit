import React, {useContext} from 'react';
import {View, FlatList, Text} from 'react-native';

import {CategoryContext} from '../contexts';

import {SafeAreaView} from 'react-native-safe-area-context';
import CategoryTile from '../Components/CategoryTile';

const CategoriesScreen = () => {
  const {categoryImages} = useContext(CategoryContext);

  const renderItem = ({item, index}) => {
    return <CategoryTile index={index} imageURL={item[1]} category={item[0]} />;
  };

  const styles = {
    container: {flex: 1},
    altPage: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  };

  return categoryImages.length > 0 ? (
    <SafeAreaView style={styles.container}>
      <FlatList numColumns={2} renderItem={renderItem} data={categoryImages} />
    </SafeAreaView>
  ) : (
    <View style={styles.altPage}>
      <Text>Create or join a collection to start adding items!</Text>
    </View>
  );
};

export default CategoriesScreen;
