/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {fetchSynonyms} from '../api';
import {Text, View} from 'native-base';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useAppSelector} from '../redux/hooks';
import {selectWord} from '../redux/state/word';

const Synonyms = () => {
  const wordContent = useAppSelector(selectWord);

  const {isLoading, isError, data, refetch} = useQuery(['synonyms'], () =>
    wordContent.enWord.toLowerCase() === 'book'
      ? [
          {
            partOfSpeech: 'noun',
            synonyms: [
              'tome',
              'volume',
              'booklet',
              'libretto',
              'account',
              'record',
            ],
          },
        ]
      : fetchSynonyms(wordContent.enWord),
  );

  useEffect(() => {
    refetch();
  }, [wordContent.enWord]);

  return (
    <View className="pl-[4vh] pr-[4vh]">
      {isLoading && (
        <View className="w-[40vh] h-[30vh] self-center top-[55vh] justify-center absolute">
          <ActivityIndicator
            className="self-center"
            animating={true}
            color={MD2Colors.red800}
          />
        </View>
      )}
      <Text className="text-black text-sm">
        {isError
          ? 'Synonyms Not Found!!!'
          : data?.[0].synonyms[0] === undefined
          ? 'Synonyms Not Found!!!'
          : data?.map((val: any, i: number) => (
              <Text className="capitalize font-semibold" key={i}>
                {val.synonyms[0] !== undefined && (
                  <>
                    {val.partOfSpeech + ' : '}
                    <Text className="lowercase font-normal">
                      {val.synonyms.map((syn: any) => {
                        return syn + ', ';
                      })}
                      {'\n'}
                    </Text>
                  </>
                )}
              </Text>
            ))}
      </Text>
    </View>
  );
};

export default Synonyms;
