import React, {useEffect} from 'react';
import {View, TextInput} from 'react-native';
import MLKitTranslator, {
  LANG_TAGS_TYPE,
} from 'react-native-mlkit-translate-text/MLKitTranslator';
import {IconButton} from 'react-native-paper';
import Word from '../components/Word';

interface props {
  to: LANG_TAGS_TYPE;
  from: LANG_TAGS_TYPE;
  speechLang: string;
}

const SearchWord = ({to, from, speechLang}: props) => {
  const [text, onChangeText] = React.useState('');
  const [word, translateWord] = React.useState('Apple');
  const [enWord, setEnWord] = React.useState('');

  useEffect(() => {
    MLKitTranslator.isModelDownloaded(from).then(e => {
      !e && MLKitTranslator.downloadModel(from);
    });
    MLKitTranslator.isModelDownloaded(to).then(e => {
      !e && MLKitTranslator.downloadModel(to);
    });
  }, [from, to]);

  return (
    <>
      <Word
        word={word}
        enWord={enWord}
        to={to}
        from={from}
        speechLang={speechLang}
      />
      <TextInput
        className="shadow-lg shadow-gray-900 bg-white h-[6vh] w-[34vh] left-[3vh]  absolute top-[50vh] rounded-lg pl-[1vh]"
        placeholder={'Search'}
        onChangeText={onChangeText}
        inlineImageLeft={'search_icon'}
        inlineImagePadding={30}
        value={text}
      />
      <View className="justify-center rounded-lg absolute bg-white h-[6vh] w-[6vh] right-[3vh] top-[50vh] ">
        <IconButton
          style={{alignSelf: 'center'}}
          iconColor="black"
          onPress={async () => {
            translateWord(
              String(await MLKitTranslator.translateText(text, from, to)),
            );
            to !== 'ENGLISH'
              ? setEnWord(
                  String(
                    await MLKitTranslator.translateText(text, from, 'ENGLISH'),
                  ),
                )
              : undefined;
          }}
          icon={require('../../assets/enter.png')}
        />
      </View>
    </>
  );
};

export default SearchWord;
