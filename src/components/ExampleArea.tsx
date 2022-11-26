/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {exampleSentences} from '../api';
import {useQuery} from '@tanstack/react-query';

const ExampleArea = ({word}: {word: string}) => {
  const {isLoading, isError, data, refetch} = useQuery(['sentences'], () =>
    exampleSentences(word),
  );
  const [sentenceNow, setsentenceNow] = React.useState('');

  useEffect(() => {
    setsentenceNow(data);
    refetch();
  }, [data, word]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error.</Text>;
  }
  return (
    <View className="top-[15vh] bg-white w-[40vh] h-[20vh] self-center  rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
      <Text className="text-black font-bold p-4 text-base ">Example</Text>
      <View className="justify-center">
        <Text className="text-gray-500 p-4 text-base self-center">
          {String(sentenceNow)}
          {/* <Text className="font-bold">{word === '' ? 'apple' : word}</Text>{' '} */}
        </Text>
      </View>
    </View>
  );
};
export default ExampleArea;
