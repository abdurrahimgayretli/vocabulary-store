/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {LANG_TAGS_TYPE} from 'react-native-mlkit-translate-text/MLKitTranslator';
import SearchWord from '../components/SearchWord';
import {IconButton} from 'react-native-paper';

const DropDownMenu = () => {
  const [change, setChange] = useState(false);
  const [fromSelected, setSelectedFrom] =
    React.useState<LANG_TAGS_TYPE>('ENGLISH');
  const [toSelected, setSelectedTo] = React.useState<LANG_TAGS_TYPE>('TURKISH');
  const [fromSpeechLang, setFromSpeechLang] = React.useState('en-GB');
  const [toSpeechLang, setToSpeechLang] = React.useState('tr-TR');
  const [temp, setTemp] = useState<LANG_TAGS_TYPE>('TURKISH');

  const data = [
    {key: 'TURKISH', value: 'TURKISH', speechLang: 'tr-TR'},
    {key: 'ENGLISH', value: 'ENGLISH', speechLang: 'en-GB'},
    {key: 'RUSSIAN', value: 'RUSSIAN', speechLang: 'ru-RU'},
  ];

  useEffect(() => {
    setSelectedTo(fromSelected);
    setSelectedFrom(toSelected);
    setToSpeechLang(fromSpeechLang);
    setFromSpeechLang(toSpeechLang);
  }, [change]);

  return (
    <>
      <SearchWord
        to={toSelected}
        from={fromSelected}
        toSpeechLang={toSpeechLang}
        fromSpeechLang={fromSpeechLang}
      />
      <View
        className={`absolute h-[7vh] top-[35vh] w-[16vh] ${
          change ? 'right-[4vh]' : 'left-[4vh]'
        } `}>
        <SelectList
          search={false}
          boxStyles={{
            backgroundColor: 'white',
            borderRadius: 8,
            borderColor: '#D0D5DD',
          }}
          dropdownItemStyles={{backgroundColor: 'white'}}
          defaultOption={data[0]}
          setSelected={(val: LANG_TAGS_TYPE) => {
            if (!change) {
              setSelectedFrom(val);
              data.forEach(from => {
                String(val) === from.value
                  ? setFromSpeechLang(from.speechLang)
                  : '';
              });
            } else {
              setSelectedTo(val);
              data.forEach(to => {
                String(val) === to.value ? setToSpeechLang(to.speechLang) : '';
              });
            }
          }}
          data={data}
          save="value"
        />
      </View>
      <View className="absolute top-[35.5vh] self-center bg-white border-2 h-[5vh] w-[5vh] justify-center rounded-lg">
        <IconButton
          iconColor="black"
          onPress={() => {
            change ? setChange(false) : setChange(true);
          }}
          style={{alignSelf: 'center'}}
          icon={require('../../assets/arrows-right-left.png')}
        />
      </View>
      <View
        className={`absolute h-[7vh] top-[35vh] w-[16vh] ${
          !change ? 'right-[4vh]' : 'left-[4vh]'
        } `}>
        <SelectList
          search={false}
          boxStyles={{
            backgroundColor: 'white',
            borderRadius: 8,
            borderColor: '#D0D5DD',
          }}
          dropdownItemStyles={{backgroundColor: 'white'}}
          defaultOption={data[1]}
          setSelected={(val: LANG_TAGS_TYPE) => {
            if (!change) {
              setSelectedTo(val);
              data.forEach((to, i) => {
                String(val) === to.value ? setToSpeechLang(to.speechLang) : '';
              });
            } else {
              setSelectedFrom(val);
              data.forEach(from => {
                String(val) === from.value
                  ? setFromSpeechLang(from.speechLang)
                  : '';
              });
            }
          }}
          data={data}
          save="value"
        />
      </View>
    </>
  );
};

export default DropDownMenu;
