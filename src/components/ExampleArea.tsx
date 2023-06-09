/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {exampleSentences} from '../api';
import {useQuery} from '@tanstack/react-query';
import {ScrollView} from 'native-base';
import Synonyms from './Synonyms';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  example,
  wordContent,
  control,
  setControl,
  setExample,
} from '../redux/state/word';
import {useNetInfo} from '@react-native-community/netinfo';

const ExampleArea = () => {
  const wordContents = useAppSelector(wordContent);
  const exampleContent = useAppSelector(example);
  const controlContent = useAppSelector(control);

  const [word, setWord] = useState('');
  const [error, setError] = useState(true);
  const [sentence, setSentence] = useState(exampleContent.sentence);
  const [wordArray, setWordArray] = useState<String[]>(
    sentence?.toLowerCase().split(wordContents.enWord.toLowerCase()),
  );

  const dispatch = useAppDispatch();
  const netInfo = useNetInfo();

  const {isLoading, data, refetch} = useQuery(['sentences'], () => {
    return wordContents.enWord === 'Vocabulary Store'
      ? 'Welcome to Vocabulary Store'
      : controlContent.control
      ? exampleContent.sentence
      : exampleSentences(wordContents.enWord).catch(() => {
          setError(true);
        });
  });

  const text = () => {
    if (wordArray !== undefined) {
      return (
        <Text>
          {wordArray[0]}
          {wordArray[1] !== undefined && (
            <Text className="font-bold">
              {wordContents.enWord.toLowerCase()}
            </Text>
          )}
          {wordArray[1]}
        </Text>
      );
    }
  };

  useEffect(() => {
    if (netInfo.isConnected === true) {
      setError(false);
      refetch();
    } else {
      setError(true);
    }
  }, [wordContents.enWord, netInfo.isConnected]);

  useEffect(() => {
    if (data !== undefined && !error) {
      dispatch(setExample({...exampleContent, sentence: data}));
      setWord(wordContents.enWord);
    }
  }, [data]);

  useEffect(() => {
    if (exampleContent.sentence !== null) {
      setSentence(exampleContent.sentence);
      setWordArray(
        exampleContent.sentence
          .toLowerCase()
          .split(wordContents.enWord.toLowerCase()),
      );
    }
  }, [exampleContent.sentence]);

  useEffect(() => {
    dispatch(setControl({...controlContent, control: false}));
    return () => {
      dispatch(setControl({...controlContent, control: true}));
    };
  }, []);

  return (
    <View
      className="bg-white w-full self-center rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900"
      style={{height: hp('20%'), top: hp('30%')}}>
      <ScrollView>
        <Text
          className="text-black font-bold text-base "
          style={{
            paddingLeft: wp('6%'),
            paddingTop: hp('2%'),
            fontSize: hp('2.1%'),
            lineHeight: hp('3.1%'),
          }}>
          Example
        </Text>
        <View className="justify-center">
          <Text
            className="text-black"
            style={{
              paddingLeft: wp('8%'),
              paddingRight: wp('8%'),
              fontSize: hp('2.1%'),
              lineHeight: hp('3.1%'),
            }}>
            {isLoading
              ? 'Loading...'
              : data === null
              ? 'Sentence Not Found!!!'
              : netInfo.isConnected === false && word === wordContents.enWord
              ? text()
              : netInfo.isConnected === false
              ? 'No Internet Connection!!!'
              : error
              ? 'Sentence Not Found!!!'
              : text()}
          </Text>
        </View>
        <View>
          <Text
            className="text-black font-bold"
            style={{
              paddingLeft: wp('6%'),
              fontSize: hp('2.1%'),
              lineHeight: hp('3.1%'),
            }}>
            Synonyms
          </Text>
          <Synonyms />
        </View>
      </ScrollView>
    </View>
  );
};
export default ExampleArea;
