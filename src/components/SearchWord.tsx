/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, TextInput, Keyboard} from 'react-native';
import MLKitTranslator, {
  LANG_TAGS_TYPE,
} from 'react-native-mlkit-translate-text/MLKitTranslator';
import {IconButton} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectWord, setWordContent} from '../redux/state/word';

interface props {
  source: LANG_TAGS_TYPE;
  target: LANG_TAGS_TYPE;
  sourceSpeechLang: string;
  targetSpeechLang: string;
  change: boolean;
}
const SearchWord = ({
  source,
  target,
  sourceSpeechLang,
  targetSpeechLang,
  change,
}: props) => {
  const dispatch = useAppDispatch();
  const wordContent = useAppSelector(selectWord);

  const [text, onChangeText] = useState('');
  const [control, setControl] = useState(false);
  const [word, setWord] = useState(wordContent.word);
  const [transWord, setTransWord] = useState(wordContent.enWord);
  const [enWord, setEnWord] = useState(wordContent.enWord);

  useEffect(() => {
    MLKitTranslator.isModelDownloaded(source).then(e => {
      !e && MLKitTranslator.downloadModel(source);
    });
    MLKitTranslator.isModelDownloaded(target).then(e => {
      !e && MLKitTranslator.downloadModel(target);
    });
  }, [target, source]);

  useEffect(() => {
    setWord(text);
  }, [enWord]);

  useEffect(() => {
    if (text !== '' && control) {
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
    }
  }, [word, transWord]);

  useEffect(() => {
    if (control) {
      onChangeText(wordContent.transWord);
      setWord(wordContent.transWord);
      setTransWord(wordContent.word);
    } else {
      onChangeText(wordContent.word);
      setWord(wordContent.word);
      setTransWord(wordContent.transWord);
      setControl(true);
    }
  }, [change]);

  return (
    <>
      <TextInput
        className="shadow-lg shadow-gray-900 bg-white h-[6vh] w-[30vh] left-[4vh]  absolute top-[45vh] rounded-lg pl-[1vh]"
        placeholder={'Search'}
        onChangeText={onChangeText}
        inlineImageLeft={'search_icon'}
        inlineImagePadding={30}
        value={text}
      />
      <View className="shadow-lg shadow-gray-900 justify-center rounded-lg absolute bg-white h-[6vh] w-[6vh] right-[4vh] top-[45vh] border-gray-300">
        <IconButton
          style={{alignSelf: 'center'}}
          iconColor="black"
          onPress={async () => {
            if (text !== '') {
              Keyboard.dismiss();
              setTransWord(
                String(
                  await MLKitTranslator.translateText(text, source, target),
                ),
              );
              String(MLKitTranslator.translateText(text, source, 'ENGLISH')) !==
              enWord
                ? setEnWord(
                    String(
                      await MLKitTranslator.translateText(
                        text,
                        source,
                        'ENGLISH',
                      ),
                    ),
                  )
                : '';
            }
          }}
          icon={require('../../assets/enter.png')}
        />
      </View>
    </>
  );
};

export default SearchWord;
