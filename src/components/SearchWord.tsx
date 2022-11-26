/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';
import MLKitTranslator, {
  LANG_TAGS_TYPE,
  LANG_TAGS,
} from 'react-native-mlkit-translate-text/MLKitTranslator';
import Word from '../components/Word';

interface props {
  to: LANG_TAGS_TYPE;
  from: LANG_TAGS_TYPE;
}

const InputText = ({to, from}: props) => {
  const [text, onChangeText] = React.useState('');
  const [word, translateWord] = React.useState('apple');

  useEffect(() => {
    MLKitTranslator.downloadModel(from);
    MLKitTranslator.downloadModel(to);
  }, [from, to]);

  return (
    <>
      <Word word={word} />
      <TextInput
        className="shadow-lg shadow-gray-900 bg-white h-[6vh] w-[34vh] left-[3vh]  absolute top-[50vh] rounded-lg"
        placeholder={'Search'}
        onChangeText={onChangeText}
        inlineImageLeft={'search_icon'}
        inlineImagePadding={10}
        value={text}
      />
      <>
        <TouchableOpacity
          className="justify-center absolute h-[6vh] w-[6vh] right-[3vh] rounded-lg top-[50vh] bg-slate-500"
          onPress={async () => {
            translateWord(
              String(await MLKitTranslator.translateText(text, from, to)),
            );
          }}>
          <Text>{''}</Text>
        </TouchableOpacity>
      </>
    </>
  );
};

export default InputText;
