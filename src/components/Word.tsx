import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import ExampleArea from './ExampleArea';
import WordImage from './WordImage';
import {IconButton} from 'react-native-paper';
import Voice from '@react-native-voice/voice';

const Word = ({word}: {word: string}) => {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    console.log(results[0]);
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [results]);

  const startSpeechToText = async () => {
    await Voice.start('en-GB');
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
    console.log(error);
  };

  return (
    <>
      <View className="top-[5vh] bg-white w-[36vh] h-[5vh] self-center justify-center rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
        <Text className="text-black font-bold self-center text-base ">
          {word === '' ? (word = 'Apple') : word.toUpperCase()}
        </Text>

        <IconButton
          onPress={!started ? startSpeechToText : stopSpeechToText}
          style={{position: 'absolute', right: 5, width: 30, height: 30}}
          icon={'folder'}
        />
      </View>

      <ExampleArea word={word} />
      <WordImage word={word} />
      {results.map((result, index) => (
        <Text className="top-[10vh]" key={index}>
          {result}
        </Text>
      ))}
    </>
  );
};
export default Word;
