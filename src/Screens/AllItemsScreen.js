import React, {useState, useEffect, useContext} from 'react';

import Item from '../Components/Item';
import {CollectionContext} from '../contexts';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  FlatList,
  SafeAreaView,
  View,
  TextInput,
  useWindowDimensions,
  Text,
} from 'react-native';

const AllItemsScreen = ({navigation, route}) => {
  const {collectionSnapshot} = useContext(CollectionContext);
  const {height, width} = useWindowDimensions();
  const [text, setText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const filterItems = filterText => {
      setFilteredItems(prev =>
        prev.filter(item => {
          return (
            item.collectionName
              .toLowerCase()
              .includes(filterText.toLowerCase()) ||
            item.description.toLowerCase().includes(filterText.toLowerCase())
          );
        }),
      );
    };
    if (collectionSnapshot) {
      setFilteredItems(
        [...collectionSnapshot.items].sort((a, b) =>
          a.time > b.time ? -1 : 1,
        ),
      );
      filterItems(text);
    }
  }, [collectionSnapshot, text]);

  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} />;
  };

  const styles = {
    container: {flex: 1},
    searchContainer: {
      width: width,
      height: height / 13.5,
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
    searchBox: {
      flexDirection: 'row',
      backgroundColor: 'rgb(242, 242, 242)',
      width: width - 40,
      borderRadius: 10,
      alignItems: 'center',
      paddingLeft: 15,
    },
    text: {
      width: width - 80,
      paddingLeft: 15,
      color: 'black',
    },
    altPage: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  };

  return collectionSnapshot ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} />
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Search"
            style={styles.text}
          />
        </View>
      </View>
      <FlatList data={filteredItems} renderItem={renderItem} numColumns={3} />
    </SafeAreaView>
  ) : (
    <View style={styles.altPage}>
      <Text>Create or join a collection to start adding items!</Text>
    </View>
  );
};

export default AllItemsScreen;
