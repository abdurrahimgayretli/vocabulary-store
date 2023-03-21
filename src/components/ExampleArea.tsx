/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {exampleSentences} from '../api';
import {useQuery} from '@tanstack/react-query';
import {ScrollView} from 'native-base';
import Synonyms from './Synonyms';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  example,
  selectWord,
  setSentence,
  control,
  setControl,
} from '../redux/state/word';

const ExampleArea = () => {
  const wordContent = useAppSelector(selectWord);
  const exampleContent = useAppSelector(example);
  const controlContent = useAppSelector(control);

  const dispatch = useAppDispatch();

  const {isLoading, isError, data, refetch} = useQuery(['sentences'], () => {
    return wordContent.enWord.toLowerCase() === 'book' || controlContent.control
      ? exampleContent.sentence
      : exampleSentences(wordContent.enWord);
  });
  const [wordArray, setWordArray] = React.useState(['']);

  useEffect(() => {
    refetch();
  }, [wordContent.enWord]);

  useEffect(() => {
    if (data !== undefined) {
      dispatch(
        setSentence({
          sentence: data,
          synonyms: exampleContent.synonyms,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (exampleContent.sentence !== null) {
      setWordArray(exampleContent.sentence.split(wordContent.enWord));
    }
    console.log(exampleContent.sentence);
  }, [exampleContent.sentence]);

  useEffect(() => {
    dispatch(setControl({control: false}));
    return () => {
      dispatch(setControl({control: true}));
      console.log(controlContent.control);
    };
  }, []);

  return (
    <View className="top-[10vh] bg-white w-[40vh] h-[20vh] self-center  rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
      <ScrollView>
        <Text className="text-black font-bold pl-[3vh] pt-[2vh] text-base ">
          Example
        </Text>
        <View className="justify-center">
          <Text className="pl-[4vh] pr-[4vh] text-black text-base">
            {isLoading ? (
              'Loading...'
            ) : isError ? (
              'Sentence Not Found!!!'
            ) : data === null ? (
              'Sentence Not Found!!!'
            ) : (
              <Text>
                {wordArray[0]}
                <Text className="font-bold">
                  {wordContent.enWord.toLowerCase()}
                </Text>
                {wordArray[1]}
              </Text>
            )}
          </Text>
        </View>
        <View>
          <Text className="text-black font-bold pl-[3vh] text-base ">
            Synonyms
          </Text>
          <Synonyms />
        </View>
      </ScrollView>
    </View>
  );
};
export default ExampleArea;
