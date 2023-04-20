/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IconButton} from 'react-native-paper';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AddListPopUp from './AddListPopUp';
import {useAppSelector} from '../redux/hooks';
import {selectWord} from '../redux/state/word';
import AllowModal from './AllowModal';

const Word = () => {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState(['']);
  const [cont, setCont] = useState(true);
  const [pronunciation, setPronunciation] = useState(false);

  const wordContent = useAppSelector(selectWord);

  const [visibleAddList, setVisibleAddList] = React.useState(false);
  const hiddenAddList = () => setVisibleAddList(false);

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
    setResults(['']);
    setCont(true);
    Tts.setDefaultLanguage(String(wordContent.targetSpeechLang)).catch(() => {
      setCont(false);
    });
  }, [wordContent.transWord]);

  const startSpeechToText = async () => {
    if (cont) {
      await Voice.start(String(wordContent.targetSpeechLang));
      setStarted(true);
    } else {
      setVisibleAddList(true);
    }
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
      <View
        className="bg-white w-full self-center justify-center rounded-lg border-2 border-gray-300 absolute shadow-lg shadow-gray-900"
        style={{height: hp('5%'), top: hp('2%')}}>
        <Text
          onPress={() => {
            Tts.setDefaultLanguage(String(wordContent.targetSpeechLang))
              .then(() => {
                Tts.speak(wordContent.transWord);
              })
              .catch(() => {
                setVisibleAddList(true);
              });
          }}
          className={`${
            results[0] !== ''
              ? pronunciation
                ? 'text-green-400'
                : 'text-red-600'
              : 'text-black'
          } font-bold self-center text-lg underline decoration-dotted capitalize decoration-cyan-300`}
          style={{fontSize: hp('2.5%'), lineHeight: hp('3%')}}>
          {wordContent.transWord === ''
            ? (wordContent.transWord = 'Apple')
            : wordContent.transWord}
        </Text>
        {visibleAddList && (
          <View>
            <AllowModal show={visibleAddList} notShow={hiddenAddList} />
          </View>
        )}
        <AddListPopUp />
        <IconButton
          onPress={!started ? startSpeechToText : stopSpeechToText}
          style={{
            position: 'absolute',
            right: wp('1%'),
            width: wp('10%'),
            height: hp('5%'),
          }}
          iconColor={started === true ? '#90EE90' : 'black'}
          icon={require('../../assets/microphone.png')}
        />
      </View>
    </>
  );
};
export default Word;
