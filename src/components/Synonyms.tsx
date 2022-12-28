/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {fetchSynonyms} from '../api';
import {Text, View} from 'native-base';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Synonyms = ({word}: {word: string}) => {
  const {isLoading, isError, data, refetch} = useQuery(['sysnonyms'], () =>
    fetchSynonyms(word === null ? 'book' : word),
  );

  useEffect(() => {
    refetch();
  }, [data, word]);

  return (
    <View>
      {isLoading && (
        <View className="w-[40vh] h-[30vh] self-center top-[55vh] justify-center absolute">
          <ActivityIndicator
            className="self-center"
            animating={true}
            color={MD2Colors.red800}
          />
        </View>
      )}
      {isError ? (
        <Text className="pl-[4vh] pr-[4vh] capitalize font-semibold">
          Synonyms Not Found!!!
        </Text>
      ) : (
        data?.map((val: any, i: number) => (
          <View key={i}>
            {val.synonyms[0] !== undefined && (
              <Text className="pl-[4vh] pr-[4vh] capitalize font-semibold text-base">
                {val.partOfSpeech + ' : '}
                <Text className="lowercase font-sans ">
                  {val.synonyms.map((syn: any) => {
                    return syn + ', ';
                  })}
                </Text>
              </Text>
            )}
          </View>
        ))
      )}
    </View>
  );
};

export default Synonyms;
