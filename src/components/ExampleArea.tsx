/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, ToastAndroid} from 'react-native';
import React, {useEffect} from 'react';
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
    return wordContent.enWord.toLowerCase() === 'book'
      ? 'A book of selected poems'
      : controlContent.control
      ? exampleContent.sentence
      : exampleSentences(wordContent.enWord).catch(() => {
          ToastAndroid.show('No Internet connection', ToastAndroid.SHORT);
          return false;
        });
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
          image: exampleContent.image,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (exampleContent.sentence !== null && data !== false) {
      setWordArray(
        exampleContent.sentence
          .toLowerCase()
          .split(wordContent.enWord.toLowerCase()),
      );
    }
  }, [exampleContent.sentence]);

  useEffect(() => {
    dispatch(setControl({control: false}));
    return () => {
      dispatch(setControl({control: true}));
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
            {isLoading ? (
              'Loading...'
            ) : isError ? (
              'Sentence Not Found!!!'
            ) : data === false ? (
              'No Internet Connection'
            ) : data === null ? (
              'Sentence Not Found!!!'
            ) : (
              <Text>
                {wordArray[0]}
                {wordArray[1] !== undefined && (
                  <Text className="font-bold">
                    {wordContent.enWord.toLowerCase()}
                  </Text>
                )}
                {wordArray[1]}
              </Text>
            )}
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
