/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {fetchSynonyms} from '../api';
import {Text, View} from 'native-base';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {control, example, selectWord, setSynonyms} from '../redux/state/word';

const Synonyms = () => {
  const wordContent = useAppSelector(selectWord);
  const exampleContent = useAppSelector(example);
  const controlContent = useAppSelector(control);

  const [syn, setSyn] = useState(exampleContent.synonyms);

  const dispatch = useAppDispatch();

  const {isLoading, isError, data, refetch} = useQuery(['synonyms'], () =>
    wordContent.enWord.toLowerCase() === 'book' || controlContent.control
      ? exampleContent.synonyms
      : fetchSynonyms(wordContent.enWord),
  );

  useEffect(() => {
    refetch();
  }, [wordContent.enWord]);

  useEffect(() => {
    if (data !== undefined) {
      dispatch(
        setSynonyms({
          sentence: exampleContent.sentence,
          synonyms: data,
          image: exampleContent.image,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (exampleContent.synonyms !== null) {
      setSyn(exampleContent.synonyms);
    }
  }, [exampleContent.synonyms]);

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
          : syn?.[0].synonyms[0] === undefined
          ? 'Synonyms Not Found!!!'
          : syn?.map((val: any, i: number) => (
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
            ))}
      </Text>
    </View>
  );
};

export default Synonyms;
