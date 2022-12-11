/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {exampleSentences} from '../api';
import {useQuery} from '@tanstack/react-query';
import {LANG_TAGS_TYPE} from 'react-native-mlkit-translate-text/MLKitTranslator';

const ExampleArea = ({
  enWord,
}: // word,
// to,
// from,
{
  enWord: string;
  word: string;
  to: LANG_TAGS_TYPE;
  from: LANG_TAGS_TYPE;
}) => {
  const {isLoading, isError, data, refetch} = useQuery(['sentences'], () => {
    return exampleSentences(enWord);
  });
  const [sentenceNow, setsentenceNow] = React.useState('');
  const [wordArray, setWordArray] = React.useState(['']);
  // const [tempSentence, setTempSentence] = React.useState('');

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

  // useEffect(() => { Güzel çevirmiyor
  //   refetch().then(() => {
  //     if (data !== undefined) {
  //       setsentenceNow(data);
  //       console.log(1 + data);
  //     }
  //   });
  // }, [to === 'ENGLISH' ? word : enWord, data]);

  // useEffect(() => {
  //   if (to === 'ENGLISH') {
  //     if (sentenceNow !== null) {
  //       console.log(2 + word);
  //       setWordArray(
  //         sentenceNow.split(word === '' ? 'Apple' : word.toLocaleLowerCase()),
  //       );
  //     }
  //   } else {
  //     console.log(2.2);
  //     translateSentence();
  //   }
  // }, [sentenceNow]);

  // useEffect(() => {
  //   if (to !== 'ENGLISH') {
  //     console.log(3 + word);
  //     setWordArray(
  //       tempSentence.split(word === '' ? 'elma' : word.toLocaleLowerCase()),
  //     );
  //   }
  // }, [tempSentence]);

  // const translateSentence = async () => {
  //   setTempSentence(
  //     String(await MLKitTranslator.translateText(sentenceNow, from, to)),
  //   );
  //   await console.log(2.2 + tempSentence);
  // };

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
                <Text className="font-bold">{enWord}</Text>
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
