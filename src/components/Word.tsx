import {View, Text} from 'react-native';
import React from 'react';
import ExampleArea from './ExampleArea';
import WordImage from './WordImage';

const Word = ({word}: {word: string}) => {
  return (
    <>
      <View className="top-[5vh] bg-white w-[36vh] h-[5vh] self-center justify-center rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
        <Text className="text-black font-bold self-center text-base ">
          {word === '' ? (word = 'apple') : word}
        </Text>
      </View>
      <ExampleArea word={word} />
      <WordImage />
    </>
  );
};
export default Word;
