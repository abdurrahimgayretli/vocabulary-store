/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';
import MLKitTranslator, {
  LANG_TAGS_TYPE,
  LANG_TAGS,
} from 'react-native-mlkit-translate-text/MLKitTranslator';
import Word from '../components/Word';

const InputText = (props: any) => {
  const [text, onChangeText] = React.useState('');
  const [word, translateWord] = React.useState('');

  useEffect(() => {
    MLKitTranslator.downloadModel(props.from);
    MLKitTranslator.downloadModel(props.to);
  }, [props]);

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
              String(
                await MLKitTranslator.translateText(
                  text,
                  props.from as LANG_TAGS_TYPE,
                  props.to as LANG_TAGS_TYPE,
                ),
              ),
            );
          }}>
          <Text>{''}</Text>
        </TouchableOpacity>
      </>
    </>
  );
};

export default InputText;
