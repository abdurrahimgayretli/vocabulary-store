/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, TextInput, Keyboard, ToastAndroid} from 'react-native';
import MLKitTranslator, {
  LANG_TAGS_TYPE,
} from 'react-native-mlkit-translate-text/MLKitTranslator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {IconButton} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {FirstType, selectWord, setWordContent} from '../redux/state/word';

interface props {
  source: LANG_TAGS_TYPE;
  target: LANG_TAGS_TYPE;
  sourceSpeechLang: string;
  targetSpeechLang: string;
  change: boolean;
  first: FirstType;
}
const SearchWord = ({
  source,
  target,
  sourceSpeechLang,
  targetSpeechLang,
  change,
  first,
}: props) => {
  const dispatch = useAppDispatch();
  const wordContent = useAppSelector(selectWord);

  const [text, setText] = useState(wordContent.word);
  const [temp, setTemp] = useState(wordContent.word);
  const [onChange, setOnChange] = useState(true);
  const [control, setControl] = useState(false);
  const [word, setWord] = useState(wordContent.word);
  const [transWord, setTransWord] = useState(wordContent.enWord);
  const [enWord, setEnWord] = useState(wordContent.enWord);

  const onPress = async () => {
    if (first.target === false || first.source === false) {
      ToastAndroid.show('Please select language', ToastAndroid.SHORT);
    } else if (text !== '') {
      Keyboard.dismiss();
      setTransWord(
        String(await MLKitTranslator.translateText(text, source, target)),
      );
      String(MLKitTranslator.translateText(text, source, 'ENGLISH')) !==
        enWord &&
        setEnWord(
          String(await MLKitTranslator.translateText(text, source, 'ENGLISH')),
        );
    }
  };

  useEffect(() => {
    setWord(text);
  }, [enWord]);

  useEffect(() => {
    if (text !== '') {
      dispatch(
        setWordContent({
          word: word,
          transWord: transWord,
          enWord: enWord,
          source: source,
          sourceSpeechLang: sourceSpeechLang,
          target: target,
          targetSpeechLang: targetSpeechLang,
        }),
      );
      setTemp(text);
      setOnChange(true);
      setControl(true);
    }
  }, [word, transWord]);

  useEffect(() => {
    if (control && temp === text && onChange) {
      setText(wordContent.transWord);
      setWord(wordContent.transWord);
      setTransWord(wordContent.word);
      setTemp(wordContent.transWord);
    } else if (temp === text && onChange) {
      setText(wordContent.word);
      setWord(wordContent.word);
      setTransWord(wordContent.transWord);
      setTemp(wordContent.word);
      setControl(true);
    }
  }, [change]);

  useEffect(() => {
    if (temp !== text) {
      setOnChange(false);
    }
  }, [text]);

  return (
    <>
      <View
        className="shadow-lg shadow-gray-900 bg-white rounded-lg"
        style={{
          width: wp('60%'),
          height: hp('6%'),
          top: hp('20%'),
        }}>
        <TextInput
          placeholder={'Search'}
          onChangeText={setText}
          inlineImageLeft={'search_icon'}
          inlineImagePadding={hp('5%')}
          value={text}
          style={{
            color: 'black',
            fontSize: hp('1.8%'),
            width: wp('60%'),
            height: hp('6%'),
            paddingLeft: wp('2%'),
            paddingRight: wp('2%'),
          }}
        />
      </View>
      <View
        className="shadow-lg shadow-gray-900 justify-center rounded-lg absolute bg-white right-0 border-gray-300"
        style={{width: wp('15%'), height: hp('6%'), top: hp('20%')}}>
        <IconButton
          style={{alignSelf: 'center'}}
          iconColor="black"
          onPress={onPress}
          icon={require('../../assets/enter.png')}
        />
      </View>
    </>
  );
};

export default SearchWord;
