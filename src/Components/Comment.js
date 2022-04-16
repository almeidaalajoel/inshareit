import React from 'react';
import {Text, View} from 'react-native';

const Comment = props => {
  const styles = {
    comment: {
      fontSize: 13,
      color: 'black',
    },
    timestamp: {
      alignItems: 'flex-end',
      paddingHorizontal: 10,
    },
    timestampText: {
      fontSize: 11,
    },
    commenter: {fontWeight: 'bold', color: 'black', fontSize: 14},
    row: {
      paddingHorizontal: 15,
      paddingTop: 10,
    },
  };

  const time = Date.now();
  const elapsed = time - props.time;
  let unit;
  let num = '';

  if (elapsed < 60000) {
    unit = 'just now';
  } else if (elapsed < 120000) {
    unit = 'minute ago';
    num = '1';
  } else if (elapsed < 3600000) {
    unit = 'minutes ago';
    num = Math.floor(elapsed / 60000).toString();
  } else if (elapsed < 7200000) {
    unit = 'hour ago';
    num = '1';
  } else if (elapsed < 86400000) {
    unit = 'hours ago';
    num = Math.floor(elapsed / 3600000).toString();
  } else if (elapsed < 172800000) {
    unit = 'day ago';
    num = '1';
  } else if (elapsed < 604800000) {
    unit = 'days ago';
    num = Math.floor(elapsed / 86400000).toString();
  } else {
    const date = new Date(props.time);
    unit = date.toString().slice(0, 10);
  }

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.comment}>
          <Text style={styles.commenter}>{props.commenter} </Text>
          {props.comment}
        </Text>
      </View>
      <View style={styles.timestamp}>
        <Text style={styles.timestampText}>
          {num} {unit}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
