/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {exampleSentences} from '../api';
import {useQuery} from '@tanstack/react-query';
import MLKitTranslator, {
  LANG_TAGS_TYPE,
} from 'react-native-mlkit-translate-text/MLKitTranslator';

const ExampleArea = ({
  enWord,
  word,
  to,
  from,
}: {
  enWord: string;
  word: string;
  to: LANG_TAGS_TYPE;
  from: LANG_TAGS_TYPE;
}) => {
  const {isLoading, isError, data, refetch} = useQuery(['sentences'], () =>
    exampleSentences(to === 'ENGLISH' ? word : enWord),
  );
  const [sentenceNow, setsentenceNow] = React.useState('');
  const [wordArray, setWordArray] = React.useState(['']);
  const [tempSentence, setTempSentence] = React.useState('');

  useEffect(() => {
    refetch().then(async () => {
      if (data !== undefined) {
        setsentenceNow(data);
        if (sentenceNow !== '') {
          if (to === 'ENGLISH') {
            setWordArray(
              sentenceNow.split(
                word === '' ? 'apple' : word.toLocaleLowerCase(),
              ),
            );
          } else {
            setTempSentence(
              String(
                await MLKitTranslator.translateText(sentenceNow, from, to),
              ),
            );

            setWordArray(tempSentence.split(word.toLocaleLowerCase()));
          }
        }
      }
    });
  }, [to === 'ENGLISH' ? word : enWord, data]);

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
                <Text className="font-bold">{word}</Text>
                <Text>{wordArray[1]}</Text>
              </>
            )}
          </>
        </Text>
      </View>
    </View>
  );
};
export default ExampleArea;
