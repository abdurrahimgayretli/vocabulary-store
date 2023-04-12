/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {LANG_TAGS_TYPE} from 'react-native-mlkit-translate-text/MLKitTranslator';
import SearchWord from '../components/SearchWord';
import {IconButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAppSelector} from '../redux/hooks';
import {selectWord} from '../redux/state/word';

const DropDownMenu = () => {
  const [change, setChange] = useState(false);
  const [openSource, setOpenSource] = useState(false);
  const [openTarget, setOpenTarget] = useState(false);

  const wordContent = useAppSelector(selectWord);

  const [source, setSource] = useState<LANG_TAGS_TYPE>(wordContent.source);
  const [target, setTarget] = useState<LANG_TAGS_TYPE>(wordContent.target);
  const [soruceSpeechLang, setSourceSpeechLang] = useState(
    wordContent.sourceSpeechLang,
  );
  const [targetSpeechLang, setTargetSpeechLang] = useState(
    wordContent.targetSpeechLang,
  );

  const lang = [
    {label: 'TURKISH', value: 'TURKISH', speechLang: 'tr-TR'},
    {label: 'ENGLISH', value: 'ENGLISH', speechLang: 'en-GB'},
    {label: 'RUSSIAN', value: 'RUSSIAN', speechLang: 'ru-RU'},
  ];

  return (
    <>
      <SearchWord
        source={!change ? source : target}
        target={change ? source : target}
        sourceSpeechLang={!change ? soruceSpeechLang : targetSpeechLang}
        targetSpeechLang={change ? soruceSpeechLang : targetSpeechLang}
        change={change}
      />
      <View
        className={
          'shadow-lg shadow-gray-900 absolute h-[7vh] top-[35vh] w-[16vh] left-[4vh]'
        }>
        <DropDownPicker
          style={{borderColor: '#D1D5DB', shadowColor: '#111827'}}
          placeholder="Lang"
          onSelectItem={(val: any) => {
            if (!change) {
              setSourceSpeechLang(val.speechLang);
            } else {
              setTargetSpeechLang(val.speechLang);
            }
          }}
          open={!change ? openSource : openTarget}
          value={!change ? source : target}
          items={lang}
          setOpen={!change ? setOpenSource : setOpenTarget}
          setValue={!change ? setSource : setTarget}
        />
      </View>
      <View className="absolute top-[35.5vh] self-center bg-white  h-[5vh] w-[5vh] justify-center rounded-lg shadow-lg shadow-gray-900 border-gray-300">
        <IconButton
          iconColor="black"
          onPress={() => {
            change ? setChange(false) : setChange(true);
          }}
          style={{alignSelf: 'center'}}
          icon={require('../../assets/arrows-right-left.png')}
        />
      </View>
      <View className={'absolute h-[7vh] top-[35vh] w-[16vh] right-[4vh]'}>
        <DropDownPicker
          style={{borderColor: '#D1D5DB', shadowColor: '#111827'}}
          placeholder="Lang"
          onSelectItem={(val: any) => {
            if (change) {
              setSourceSpeechLang(val.speechLang);
            } else {
              setTargetSpeechLang(val.speechLang);
            }
          }}
          open={change ? openSource : openTarget}
          value={change ? source : target}
          items={lang}
          setOpen={change ? setOpenSource : setOpenTarget}
          setValue={change ? setSource : setTarget}
        />
      </View>
    </>
  );
};

export default DropDownMenu;
