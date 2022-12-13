/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ExampleArea from './ExampleArea';
import WordImage from './WordImage';
import {IconButton} from 'react-native-paper';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import {LANG_TAGS_TYPE} from 'react-native-mlkit-translate-text/MLKitTranslator';
import {useQuery, useRealm} from '../models/Lists';
import {Words} from '../models/Words';
import AddListPopUp from './AddListPopUp';

const Word = ({
  word,
  transWord,
  to,
  from,
  toSpeechLang,
  fromSpeechLang,
  enWord,
}: {
  word: string;
  transWord: string;
  to: LANG_TAGS_TYPE;
  from: LANG_TAGS_TYPE;
  toSpeechLang: string;
  fromSpeechLang: string;
  enWord: string;
}) => {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState(['']);
  const [pronunciation, setPronunciation] = useState(false);
  const realm = useRealm();

  const lists = useQuery<any>('List');

  const handleAddWord = useCallback(
    (
      word: string,
      transWord: string,
      from: string,
      to: string,
      listName: string,
    ): void => {
      if (!word) {
        return;
      }
      realm.write(() => {
        const newWord = realm.create(
          'Word',
          Words.generate(word, transWord, from, to),
        );
        lists.filter(val => val.listName === listName)[0].words.push(newWord);
      });
    },
    [realm],
  );

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
    Tts.setDefaultLanguage(String(toSpeechLang));
    setResults(['']);
  }, [enWord, word]);

  const startSpeechToText = async () => {
    await Voice.start(String(toSpeechLang));
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
        transWord.split(' ').forEach(elem => {
          elem.toLocaleLowerCase() === value.toLocaleLowerCase()
            ? setPronunciation(true)
            : setPronunciation(false);
        });
      });
  };

  return (
    <>
      <View className="top-[2vh] bg-white w-[36vh] h-[5vh] self-center justify-center rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900">
        <Text
          onPress={() => {
            Tts.speak(transWord);
          }}
          className={`${
            results[0] !== ''
              ? pronunciation
                ? 'text-green-400'
                : 'text-red-600'
              : 'text-black'
          } font-bold self-center text-lg underline decoration-dotted capitalize decoration-cyan-300`}>
          {transWord === '' ? (transWord = 'Apple') : transWord}
        </Text>
        <AddListPopUp
          addWordToList={handleAddWord}
          wordInfo={{word, transWord, fromSpeechLang, toSpeechLang}}
        />
        <IconButton
          onPress={!started ? startSpeechToText : stopSpeechToText}
          style={{position: 'absolute', right: 5, width: 30, height: 30}}
          iconColor={started === true ? '#90EE90' : 'black'}
          icon={require('../../assets/microphone.png')}
        />
      </View>

      {/* <ExampleArea word={transWord} enWord={enWord} to={to} from={from} /> */}
      {/* <WordImage word={transWord} /> */}
    </>
  );
};
export default Word;
