/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import ExampleArea from './ExampleArea';
import WordImage from './WordImage';
import {IconButton} from 'react-native-paper';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

const Word = ({word, speechLang}: {word: string; speechLang: string}) => {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [pronunciation, setPronunciation] = useState(false);

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
    setPronunciation(false);
    Tts.setDefaultLanguage(String(speechLang));
  }, [word]);

  const startSpeechToText = async () => {
    await Voice.start(String(speechLang));
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
        word.split(' ').forEach(elem => {
          elem.toLocaleLowerCase() === value.toLocaleLowerCase()
            ? setPronunciation(true)
            : setPronunciation(false);
        });
      });
  };

  return (
    <>
      <View className="top-[5vh] bg-white w-[36vh] h-[5vh] self-center justify-center rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
        <Text
          onPress={() => {
            Tts.speak(word);
          }}
          className={`${
            pronunciation ? 'text-green-400' : 'text-black'
          } font-bold self-center text-base underline decoration-dotted decoration-cyan-300`}>
          {word === '' ? (word = 'Apple') : word.toUpperCase()}
        </Text>

        <IconButton
          onPress={!started ? startSpeechToText : stopSpeechToText}
          style={{position: 'absolute', right: 5, width: 30, height: 30}}
          iconColor={started == true ? '#90EE90' : 'black'}
          icon={require('../../assets/microphone.png')}
        />
      </View>
      <ExampleArea word={word} />
      <WordImage word={word} />
    </>
  );
};
export default Word;
