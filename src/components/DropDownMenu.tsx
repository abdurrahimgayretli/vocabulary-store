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

const DropDownMenu = () => {
  const [access, setAccess] = useState(true);
  const [change, setChange] = useState(false);
  const [openSource, setOpenSource] = useState(false);
  const [openTarget, setOpenTarget] = useState(false);
  const [source, setSource] = useState<LANG_TAGS_TYPE>('TURKISH');
  const [target, setTarget] = useState<LANG_TAGS_TYPE>('ENGLISH');
  const [soruceSpeechLang, setSourceSpeechLang] = useState('tr-TR');
  const [targetSpeechLang, setTargetSpeechLang] = useState('en-GB');

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
      />
      <View
        className={
          'shadow-lg shadow-gray-900 absolute h-[7vh] top-[35vh] w-[16vh] left-[4vh]'
        }>
        <DropDownPicker
          labelStyle={{borderColor: 'gray'}}
          placeholder="Lang
        "
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
      <View className="absolute top-[35.5vh] self-center bg-white border-2 h-[5vh] w-[5vh] justify-center rounded-lg shadow-lg shadow-gray-900">
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
          placeholder="Lang
        "
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
