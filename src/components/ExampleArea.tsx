/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {exampleSentences} from '../api';
import {useQuery} from '@tanstack/react-query';
import {LANG_TAGS_TYPE} from 'react-native-mlkit-translate-text/MLKitTranslator';
import {ScrollView} from 'native-base';
import Synonyms from './Synonyms';

const ExampleArea = ({
  enWord,
}: {
  enWord: string;
  word: string;
  to: LANG_TAGS_TYPE;
  from: LANG_TAGS_TYPE;
}) => {
  const {isLoading, isError, data, refetch} = useQuery(['sentences'], () => {
    return exampleSentences(enWord === '' ? 'book' : enWord);
  });
  const [sentenceNow, setsentenceNow] = React.useState('');
  const [wordArray, setWordArray] = React.useState(['']);

  useEffect(() => {
    refetch();
  }, [enWord]);

  useEffect(() => {
    if (data !== undefined) {
      setsentenceNow(data);
    }
  }, [data]);

  useEffect(() => {
    if (sentenceNow !== null) {
      setWordArray(
        sentenceNow.split(enWord === '' ? 'Apple' : enWord.toLocaleLowerCase()),
      );
    }
  }, [sentenceNow]);

  return (
    <View className="top-[10vh] bg-white w-[40vh] h-[20vh] self-center  rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
      <ScrollView>
        <Text className="text-black font-bold pl-[3vh] pt-[2vh] text-base ">
          Example
        </Text>
        <View className="justify-center">
          <Text className="pl-[4vh] pr-[4vh] text-black text-base">
            <>
              {isLoading && 'Loading...'}
              {isError ? (
                'Sentence Not Found!!!'
              ) : (
                <>
                  <Text>{wordArray[0]}</Text>
                  <Text className="font-bold">{enWord.toLowerCase()}</Text>
                  <Text>{wordArray[1]}</Text>
                </>
              )}
            </>
          </Text>
        </View>
        <View>
          <Text className="text-black font-bold pl-[3vh] text-base ">
            Synonyms
          </Text>
          <Synonyms word={enWord} />
        </View>
      </ScrollView>
    </View>
  );
};
export default ExampleArea;
