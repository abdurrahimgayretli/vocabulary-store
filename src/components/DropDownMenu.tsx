/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchWord from '../components/SearchWord';
import {IconButton} from 'react-native-paper';
import {useAppSelector} from '../redux/hooks';
import {selectWord} from '../redux/state/word';
import {LANG_TAGS_TYPE} from 'react-native-mlkit-translate-text/MLKitTranslator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SelectCountry} from 'react-native-element-dropdown';

const DropDownMenu = () => {
  const [change, setChange] = useState(false);

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
    {label: 'CHINESE', value: 'CHINESE', speechLang: 'zh-CN'},
    {label: 'JAPANESE', value: 'JAPANESE', speechLang: 'ja-JP'},
    {label: 'SPANISH', value: 'SPANISH', speechLang: 'es-ES'},
    {label: 'KOREAN', value: 'KOREAN', speechLang: 'ko-KR'},
    {label: 'FRENCH', value: 'FRENCH', speechLang: 'fr-FR'},
    {label: 'ITALIAN', value: 'ITALIAN', speechLang: 'it-IT'},
    {label: 'GERMAN', value: 'GERMAN', speechLang: 'de-DE'},
    {label: 'PORTUGUESE', value: 'PORTUGUESE', speechLang: 'pt-PT'},
    {label: 'HINDI', value: 'HINDI', speechLang: 'hi-IN'},
    {label: 'ARABIC', value: 'ARABIC', speechLang: 'ar-SA'},
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
        className={'absolute left-0'}
        style={{width: wp('34%'), height: hp('7%'), top: hp('10%')}}>
        <SelectCountry
          selectedTextStyle={{
            fontSize: hp('1.8%'),
            margin: wp('-1%'),
            color: 'black',
          }}
          style={styles.dropdown}
          placeholder="Lang"
          onChange={(val: any) => {
            if (!change) {
              setSource(val.label as LANG_TAGS_TYPE);
              setSourceSpeechLang(val.speechLang);
            } else {
              setTarget(val.label as LANG_TAGS_TYPE);
              setTargetSpeechLang(val.speechLang);
            }
          }}
          value={!change ? source : target}
          data={lang}
          imageField={''}
          labelField={'label'}
          valueField={'value'}
        />
      </View>
      <View
        className="absolute self-center bg-white justify-center rounded-lg shadow-lg shadow-gray-900 border-gray-300"
        style={{width: wp('10%'), height: hp('5%'), top: hp('10.5%')}}>
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
        className={'absolute right-0'}
        style={{width: wp('34%'), height: hp('7%'), top: hp('10%')}}>
        <SelectCountry
          selectedTextStyle={{
            fontSize: hp('1.8%'),
            margin: wp('-1%'),
            color: 'black',
          }}
          style={styles.dropdown}
          placeholder="Lang"
          onChange={val => {
            if (change) {
              setSource(val.label as LANG_TAGS_TYPE);
              setSourceSpeechLang(val.speechLang);
            } else {
              setTarget(val.label as LANG_TAGS_TYPE);
              setTargetSpeechLang(val.speechLang);
            }
          }}
          value={change ? source : target}
          data={lang}
          labelField="label"
          valueField="value"
          imageField={''}
        />
      </View>
    </>
  );
};

export default DropDownMenu;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
