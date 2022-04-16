import React, {useState, useRef, useLayoutEffect} from 'react';
import {Button, View, Text, FlatList, ScrollView} from 'react-native';
import SliderNativeComponent from 'react-native/Libraries/Components/Slider/SliderNativeComponent';
import {setSelectedLog} from 'react-native/Libraries/LogBox/Data/LogBoxData';

const Lol = () => {
  const nums = [
    [1, 2, 3, 4],
    [5, 6, 7],
    [8, 9],
  ];
  const ten = nums.reduce((prev, curr) => [...prev, ...curr], []);
  console.log(ten);

  return <View />;
};

export default Lol;
