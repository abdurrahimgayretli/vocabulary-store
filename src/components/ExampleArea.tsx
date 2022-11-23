import {View, Text} from 'react-native';
import React from 'react';

const ExampleArea = (props: any) => {
  return (
    <View className="top-[15vh] bg-white w-[40vh] h-[20vh] self-center  rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
      <Text className="text-black font-bold p-4 text-base ">Example</Text>
      <View className="justify-center">
        <Text className="text-gray-500 p-4 text-base self-center">
          This is an{' '}
          <Text className="font-bold">
            {props.word === '' ? 'apple' : props.word}
          </Text>{' '}
        </Text>
      </View>
    </View>
  );
};
export default ExampleArea;
