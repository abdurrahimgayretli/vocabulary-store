/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {exampleSentences} from '../api';
import {useQuery} from '@tanstack/react-query';

const ExampleArea = ({word}: {word: string}) => {
  const {isLoading, isError, data, refetch} = useQuery(['sentences'], () =>
    exampleSentences(word),
  );
  const [sentenceNow, setsentenceNow] = React.useState('');
  const [wordArray, setWordArray] = React.useState(['']);

  useEffect(() => {
    refetch().then(() => {
      setsentenceNow(data);
      if (sentenceNow !== '') {
        setWordArray(sentenceNow.split(word.toLocaleLowerCase()));
      }
    });
  }, [data, word, sentenceNow]);

  return (
    <View className="top-[15vh] bg-white w-[40vh] h-[20vh] self-center  rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
      <Text className="text-black font-bold pl-[3vh] pt-[2vh] text-base ">
        Example
      </Text>
      <View className="justify-center">
        <Text className="text-gray-500 text-base pt-[1vh] pl-[1.5vh] pr-[1.5vh] self-center">
          <>
            {isLoading && 'Loading...'}
            {isError ? (
              'Sentence Not Found!!!'
            ) : (
              <>
                <Text>{wordArray[0]}</Text>
                <Text className="font-bold">{word.toLowerCase()}</Text>
                <Text> {wordArray[1]}</Text>
              </>
            )}
          </>
        </Text>
      </View>
    </View>
  );
};
export default ExampleArea;
