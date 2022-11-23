/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';

const WordImage = () => {
  return (
    <Image
      className="w-[40vh] h-[30vh] top-[60vh] rounded-lg self-center absolute"
      source={{uri: 'https://picsum.photos/300/200'}}
    />
  );
};

export default WordImage;
