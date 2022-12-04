/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {LANG_TAGS_TYPE} from 'react-native-mlkit-translate-text/MLKitTranslator';
import SearchWord from '../components/SearchWord';

const DropDownMenu = () => {
  const [fromSelected, setSelectedFrom] =
    React.useState<LANG_TAGS_TYPE>('TURKISH');
  const [toSelected, setSelectedTo] = React.useState<LANG_TAGS_TYPE>('ENGLISH');
  const [speechLang, setSpeechLang] = React.useState('');

  const data = [
    {key: 'TURKISH', value: 'TURKISH', speechLang: 'tr-TR'},
    {key: 'ENGLISH', value: 'ENGLISH', speechLang: 'en-GB'},
    {key: 'RUSSIAN', value: 'RUSSIAN', speechLang: 'ru-RU'},
  ];

  useEffect(() => {
    console.log(fromSelected + ' ' + toSelected + ' ' + speechLang);
  }, [fromSelected, speechLang, toSelected]);

  return (
    <>
      <SearchWord to={toSelected} from={fromSelected} speechLang={speechLang} />
      <View className="absolute h-[7vh] top-[40vh] w-[16vh] left-[2vh] ">
        <SelectList
          boxStyles={{
            backgroundColor: 'white',
            borderRadius: 8,
            borderColor: '#D0D5DD',
          }}
          dropdownItemStyles={{backgroundColor: 'white'}}
          defaultOption={data[0]}
          setSelected={(val: LANG_TAGS_TYPE) => setSelectedFrom(val)}
          data={data}
          save="value"
        />
      </View>
      <View className="absolute h-[7vh] top-[40vh] w-[16vh] right-[2vh]">
        <SelectList
          boxStyles={{
            backgroundColor: 'white',
            borderRadius: 8,
            borderColor: '#D0D5DD',
          }}
          dropdownItemStyles={{backgroundColor: 'white'}}
          defaultOption={data[1]}
          setSelected={(val: LANG_TAGS_TYPE) => {
            setSelectedTo(val);
            data.forEach((to, i) => {
              String(val) === to.value ? setSpeechLang(to.speechLang) : '';
            });
          }}
          data={data}
          save="value"
        />
      </View>
    </>
  );
};

export default DropDownMenu;
