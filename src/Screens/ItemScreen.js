import React, {useState, useEffect, useContext, useRef} from 'react';

// import {debouncerOutgoing} from '../funcs/Debounce';

import Comment from '../Components/Comment';
import {DataContext} from '../contexts';
import {postComment, report} from '../firebase';

import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

import {
  Text,
  View,
  useWindowDimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';

const ItemScreen = ({navigation, route}) => {
  //const {user} = useContext(Contexts.UserContext);
  //const [liked, setLiked] = useState('');
  const {height, width} = useWindowDimensions();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const commentsRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const {currentItem, setCurrentItem, collectionSnapshot, userSnapshot} =
    useContext(DataContext);

  useEffect(() => {
    if (collectionSnapshot) {
      const updatedItem = [...collectionSnapshot.items].find(
        item => item.key === currentItem.key,
      );
      if (updatedItem) setCurrentItem(updatedItem);
    }
  }, [collectionSnapshot, currentItem.key, setCurrentItem]);

  useEffect(() => {
    navigation.setOptions({
      title: currentItem?.collectionName,
      headerRight: () => (
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Report this page?', '', [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Report',
                  onPress: () => {
                    report(
                      userSnapshot.defaultCollection.collectionId,
                      userSnapshot.uid,
                      currentItem.key,
                    );
                    console.log(
                      'BRUH BRUH BRUH \n',
                      userSnapshot.defaultCollection.collectionId,
                      currentItem.key,
                    );
                    Alert.alert('Post has been reported');
                  },
                },
              ])
            }>
            <Feather name="alert-triangle" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [currentItem, navigation, userSnapshot.defaultCollection.collectionId]);

  useEffect(() => {
    if (currentItem?.comments)
      setComments(
        [...currentItem.comments].sort((a, b) => (a.time > b.time ? 1 : -1)),
      );
  }, [currentItem]);

  const renderItem = ({item}) => {
    return (
      <Comment
        commenter={item.commenter}
        time={item.time}
        comment={item.comment}
      />
    );
  };

  const addComment = () => {
    console.log('comments: ', currentItem.comments);
    setComments(prev => [
      ...prev,
      {time: Date.now(), comment: commentText, commenter: userSnapshot.email},
    ]);
    postComment(
      userSnapshot.defaultCollection.collectionId,
      commentText,
      userSnapshot.email,
      currentItem,
      setCurrentItem,
    );
    Keyboard.dismiss();
    setCommentText('');
  };

  const scrollIfShould = () => {
    if (shouldScroll) commentsRef.current.scrollToEnd({animated: false});
    setShouldScroll(false);
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const styles = {
    description: {margin: 10, fontSize: 14, color: 'black'},
    container: {flex: 1},
    top: {
      height: (height * 2) / 5,
      width: width,
      alignItems: 'center',
    },
    image: {width: '100%', height: '100%'},
    commentor: {fontWeight: 'bold', color: 'black', fontSize: 15},
    commentBox: {
      flexDirection: 'row',
      //paddingHorizontal: 15,
    },
    commentInput: {
      paddingHorizontal: 10,
      width: (width * 4) / 5,
      color: 'black',
      //backgroundColor: 'red',
    },
    commentButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: (width * 1) / 5,
      //backgroundColor: 'lightblue',
    },
    separator: {
      height: 0.5,
      width: width,
      backgroundColor: 'grey',
    },
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.top}>
              <FastImage
                style={styles.image}
                source={{uri: currentItem?.imageURL}}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </View>
            <Text style={styles.description}>
              <Text style={styles.commentor}>{currentItem.uploader} </Text>
              {currentItem?.description}
            </Text>
          </View>
        }
        renderItem={renderItem}
        data={comments}
        ref={commentsRef}
        onScroll={({nativeEvent}) =>
          setShouldScroll(isCloseToBottom(nativeEvent))
        }
        onContentSizeChange={() => {
          scrollIfShould();
        }}
      />
      <View style={styles.separator} />
      <View style={styles.commentBox}>
        <View style={styles.commentInput}>
          <TextInput
            style={styles.commentInput}
            placeholder="Leave a comment..."
            multiline={true}
            blurOnSubmit={true}
            value={commentText}
            onChangeText={setCommentText}
          />
        </View>
        <View style={styles.commentButton}>
          <TouchableOpacity
            onPress={() => {
              setShouldScroll(true);
              addComment();
            }}>
            <Feather name="arrow-up-circle" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemScreen;
