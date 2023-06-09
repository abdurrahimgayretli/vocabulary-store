/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {fetchSynonyms} from '../api';
import {Text, View} from 'native-base';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {control, example, wordContent, setExample} from '../redux/state/word';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNetInfo} from '@react-native-community/netinfo';

const Synonyms = () => {
  const wordContents = useAppSelector(wordContent);
  const exampleContent = useAppSelector(example);
  const controlContent = useAppSelector(control);

  const [syn, setSyn] = useState(exampleContent.synonyms);
  const [word, setWord] = useState('');
  const [error, setError] = useState(true);

  const dispatch = useAppDispatch();

  const netInfo = useNetInfo();

  const {isLoading, data, refetch} = useQuery(['synonyms'], () =>
    wordContents.enWord === 'Vocabulary Store'
      ? [
          {
            partOfSpeech: 'noun',
            synonyms: ['Vocabulary', 'Store'],
          },
        ]
      : controlContent.control
      ? exampleContent.synonyms
      : fetchSynonyms(wordContents.enWord).catch(() => {
          setError(true);
        }),
  );

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
      dispatch(setExample({...exampleContent, synonyms: data}));
      setWord(wordContents.enWord);
    }
  }, [data]);

  useEffect(() => {
    if (exampleContent.synonyms !== null) {
      setSyn(exampleContent.synonyms);
    }
  }, [exampleContent.synonyms]);

  const text = () => {
    return syn?.map((val: any, i: number) => (
      <Text className="capitalize font-semibold" key={i}>
        {val.synonyms[0] !== undefined && (
          <>
            {val.partOfSpeech + ' : '}
            <Text className="lowercase font-normal">
              {val.synonyms.map((syns: any) => {
                return syns + ', ';
              })}
              {'\n'}
            </Text>
          </>
        )}
      </Text>
    ));
  };

  return (
    <View style={{paddingLeft: wp('8%'), paddingRight: hp('8%')}}>
      {isLoading && (
        <View
          className="self-center justify-center absolute"
          style={{width: wp('80%'), height: hp('30%'), top: hp('55%')}}>
          <ActivityIndicator
            className="self-center"
            animating={true}
            color={MD2Colors.red800}
          />
        </View>
      )}
      <Text
        className="text-black"
        style={{
          fontSize: hp('1.8%'),
          lineHeight: hp('2.6%'),
        }}>
        {syn?.[0]?.synonyms[0] === undefined
          ? 'Synonyms Not Found!!!'
          : netInfo.isConnected === false && word === wordContents.enWord
          ? text()
          : netInfo.isConnected === false
          ? 'No Internet Connection!!!'
          : error
          ? 'Synonyms Not Found!!!'
          : text()}
      </Text>
    </View>
  );
};

export default Synonyms;
