/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, TextInput, Keyboard} from 'react-native';
import MLKitTranslator, {
  LANG_TAGS_TYPE,
} from 'react-native-mlkit-translate-text/MLKitTranslator';
import {IconButton} from 'react-native-paper';
import {useAppDispatch} from '../redux/hooks';
import {setWordContent} from '../redux/state/word';

interface props {
  source: LANG_TAGS_TYPE;
  target: LANG_TAGS_TYPE;
  sourceSpeechLang: string;
  targetSpeechLang: string;
}
const SearchWord = ({
  source,
  target,
  sourceSpeechLang,
  targetSpeechLang,
}: props) => {
  const [text, onChangeText] = React.useState('');
  const [word, setWord] = React.useState('kitap');
  const [transWord, setTransWord] = React.useState('book');
  const [enWord, setEnWord] = React.useState('book');

  const dispatch = useAppDispatch();

  useEffect(() => {
    MLKitTranslator.isModelDownloaded(source).then(e => {
      !e && MLKitTranslator.downloadModel(source);
    });
    MLKitTranslator.isModelDownloaded(target).then(e => {
      !e && MLKitTranslator.downloadModel(target);
    });
  }, [target, source]);

  useEffect(() => {
    setWord(text === '' ? 'book' : text);
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
    }
  }, [enWord, transWord]);

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
      <View className="shadow-lg shadow-gray-900 justify-center rounded-lg absolute bg-white h-[6vh] w-[6vh] right-[4vh] top-[45vh]">
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
              setEnWord(
                String(
                  await MLKitTranslator.translateText(text, source, 'ENGLISH'),
                ),
              );
            }
          }}
          icon={require('../../assets/enter.png')}
        />
      </View>
    </>
  );
};

export default SearchWord;
