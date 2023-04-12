/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IconButton} from 'react-native-paper';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

import AddListPopUp from './AddListPopUp';
import {useAppSelector} from '../redux/hooks';
import {selectWord} from '../redux/state/word';

const Word = () => {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState(['']);
  const [pronunciation, setPronunciation] = useState(false);

  const wordContent = useAppSelector(selectWord);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    changeResults();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [results]);

  useEffect(() => {
    Tts.setDefaultLanguage(String(wordContent.targetSpeechLang));
    setPronunciation(false);
    setResults(['']);
  }, [wordContent.transWord]);

  const startSpeechToText = async () => {
    await Voice.start(String(wordContent.targetSpeechLang));
    setStarted(true);
  };
  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result: any) => {
    setResults(result.value);
  };
  const onSpeechError = (error: any) => {
    setStarted(false);
    console.log(error);
  };
  const onSpeechEnd = () => {
    setStarted(false);
  };

  const changeResults = () => {
    String(results[0])
      .split(' ')
      .forEach(value => {
        wordContent.transWord.split(' ').forEach(elem => {
          elem.toLocaleLowerCase() === value.toLocaleLowerCase()
            ? setPronunciation(true)
            : setPronunciation(false);
        });
      });
  };

  return (
    <>
      <View className="top-[2vh] bg-white w-[40vh] h-[5vh] self-center justify-center rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
        <Text
          onPress={() => {
            Tts.speak(wordContent.transWord);
          }}
          className={`${
            results[0] !== ''
              ? pronunciation
                ? 'text-green-400'
                : 'text-red-600'
              : 'text-black'
          } font-bold self-center text-lg underline decoration-dotted capitalize decoration-cyan-300`}>
          {wordContent.transWord === ''
            ? (wordContent.transWord = 'Apple')
            : wordContent.transWord}
        </Text>
        <AddListPopUp />
        <IconButton
          onPress={!started ? startSpeechToText : stopSpeechToText}
          style={{position: 'absolute', right: 5, width: 30, height: 30}}
          iconColor={started === true ? '#90EE90' : 'black'}
          icon={require('../../assets/microphone.png')}
        />
      </View>
    </>
  );
};
export default Word;
