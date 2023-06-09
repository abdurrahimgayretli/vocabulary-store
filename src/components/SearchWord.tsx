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
import {
  change,
  first,
  select,
  wordContent,
  setWordContent,
} from '../redux/state/word';

const SearchWord = () => {
  const dispatch = useAppDispatch();
  const wordContents = useAppSelector(wordContent);
  const selectedWord = useAppSelector(select);
  const firstControl = useAppSelector(first);
  const changeControl = useAppSelector(change);

  const [text, setText] = useState(wordContents.word);
  const [temp, setTemp] = useState(wordContents.word);
  const [onChange, setOnChange] = useState(true);
  const [control, setControl] = useState(false);
  const [word, setWord] = useState(wordContents.word);
  const [transWord, setTransWord] = useState(wordContents.enWord);
  const [enWord, setEnWord] = useState(wordContents.enWord);

  const [source, setSource] = useState<LANG_TAGS_TYPE>(wordContents.source);
  const [sourceSpeechLang, setSourceSpeechLang] = useState(
    wordContents.sourceSpeechLang,
  );
  const [target, setTarget] = useState<LANG_TAGS_TYPE>(wordContents.target);
  const [targetSpeechLang, setTargetSpeechLang] = useState(
    wordContents.targetSpeechLang,
  );

  const [search, setSearch] = useState(false);

  const [didMount, setDidMount] = useState(false);

  const onPress = async () => {
    if (firstControl.target === false || firstControl.source === false) {
      ToastAndroid.show('Please select language', ToastAndroid.SHORT);
    } else if (text !== '') {
      setDidMount(true);
      Keyboard.dismiss();
      setTransWord(
        String(
          await MLKitTranslator.translateText(
            text,
            selectedWord.source,
            selectedWord.target,
          ),
        ),
      );
      String(
        MLKitTranslator.translateText(text, selectedWord.source, 'ENGLISH'),
      ) !== enWord &&
        setEnWord(
          String(
            await MLKitTranslator.translateText(
              text,
              selectedWord.source,
              'ENGLISH',
            ),
          ),
        );
      setSearch(true);
    }
  };

  useEffect(() => {
    setWord(text);
  }, [enWord]);

  useEffect(() => {
    if (text !== '' && didMount) {
      dispatch(
        setWordContent({
          word: word,
          transWord: transWord,
          enWord: enWord,
          source: selectedWord.source,
          sourceSpeechLang: selectedWord.sourceSpeechLang,
          target: selectedWord.target,
          targetSpeechLang: selectedWord.targetSpeechLang,
        }),
      );
      setSource(selectedWord.source);
      setSourceSpeechLang(selectedWord.sourceSpeechLang);
      setTarget(selectedWord.target);
      setTargetSpeechLang(selectedWord.targetSpeechLang);
      setTemp(text);
      setOnChange(true);
      setControl(true);
    }
  }, [search]);

  useEffect(() => {
    if (control && temp === text && onChange) {
      setDidMount(true);
      setText(wordContents.transWord);
      setWord(wordContents.transWord);
      setTransWord(wordContents.word);
      setTemp(wordContents.transWord);
      dispatch(
        setWordContent({
          word: wordContents.transWord,
          transWord: wordContents.word,
          enWord: enWord,
          source: target,
          sourceSpeechLang: targetSpeechLang,
          target: source,
          targetSpeechLang: sourceSpeechLang,
        }),
      );
    } else if (temp === text && onChange) {
      setText(wordContents.word);
      setWord(wordContents.word);
      setTransWord(wordContents.transWord);
      setTemp(wordContents.word);
      setControl(true);
    }
  }, [changeControl]);

  useEffect(() => {
    setSource(wordContents.source);
    setSourceSpeechLang(wordContents.sourceSpeechLang);
    setTarget(wordContents.target);
    setTargetSpeechLang(wordContents.targetSpeechLang);
  }, [wordContents]);

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
