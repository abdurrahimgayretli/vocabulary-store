/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import SearchWord from '../components/SearchWord';
import {
  ActivityIndicator,
  IconButton,
  MD2Colors,
  Text,
} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  change,
  down,
  first,
  select,
  setChange,
  setDownloading,
  setFirst,
  setSelect,
} from '../redux/state/word';
import MLKitTranslator, {
  LANG_TAGS_TYPE,
  downloadModel,
} from 'react-native-mlkit-translate-text/MLKitTranslator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SelectCountry} from 'react-native-element-dropdown';
import {useNetInfo} from '@react-native-community/netinfo';
import AllowModal from './AllowModal';

interface Lang {
  label: LANG_TAGS_TYPE;
  value: string;
  speechLang: string;
}

const DropDownMenu = () => {
  const checkFirst = useAppSelector(first);
  const wordSelect = useAppSelector(select);
  const wordChange = useAppSelector(change);
  const isDown = useAppSelector(down);

  const dispatch = useAppDispatch();

  const netInfo = useNetInfo();

  const [source, setSource] = useState<LANG_TAGS_TYPE>(wordSelect.source);
  const [sourceSpeechLang, setSourceSpeechLang] = useState(
    wordSelect.sourceSpeechLang,
  );
  const [target, setTarget] = useState<LANG_TAGS_TYPE>(wordSelect.target);
  const [targetSpeechLang, setTargetSpeechLang] = useState(
    wordSelect.targetSpeechLang,
  );
  const [downLang, setDownLang] = useState<LANG_TAGS_TYPE>(isDown.downLang);
  const [changer, setChanger] = useState(wordChange.change);

  const didMountRef = useRef(false);

  const [content, setContent] = useState({
    lang: 'TURKISH' as LANG_TAGS_TYPE,
    type: 'pack',
    message:
      "Language pack not found!!!\nWould you like to install the language's pack?",
  });

  const [visibleLoading, setVisibleLoading] = useState(isDown.isDownloading);
  const [visibleAllowModal, setVisibleAllowModal] = useState(false);
  const hiddenAllowModal = () => setVisibleAllowModal(false);

  const lang: Lang[] = [
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

  const isDownload = (lan: Lang, bool: boolean) => {
    MLKitTranslator.isModelDownloaded(lan.label).then(e => {
      if (!netInfo.isConnected && netInfo.isConnected !== null && !e) {
        setContent({...content, lang: lan.label});
        ToastAndroid.show(
          'You must open the internet for the translation package to be downloaded.',
          ToastAndroid.LONG,
        );
      } else if (!e && netInfo.isConnected && netInfo.isConnected !== null) {
        setContent({...content, lang: lan.label});
        if (visibleLoading) {
          ToastAndroid.show(
            'A language pack is currently being downloaded',
            ToastAndroid.LONG,
          );
        } else {
          setVisibleAllowModal(true);
        }
      } else {
        if (bool) {
          dispatch(
            setSelect({
              ...wordSelect,
              source: lan.label,
              sourceSpeechLang: lan.speechLang,
            }),
          );
          setSourceSpeechLang(lan.speechLang);
          setSource(lan.label);
          dispatch(setFirst({...checkFirst, source: true}));
        } else {
          dispatch(
            setSelect({
              ...wordSelect,
              target: lan.label,
              targetSpeechLang: lan.speechLang,
            }),
          );
          setTargetSpeechLang(lan.speechLang);
          setTarget(lan.label);
          dispatch(setFirst({...checkFirst, target: true}));
        }
      }
    });
  };

  const download = (language: LANG_TAGS_TYPE) => {
    downloadModel(language);
    dispatch(setDownloading({isDownloading: true, downLang: language}));
    setDownLang(language);
    setVisibleLoading(true);
  };

  useEffect(() => {
    if (didMountRef.current) {
      dispatch(
        setSelect({
          source: target,
          sourceSpeechLang: targetSpeechLang,
          target: source,
          targetSpeechLang: sourceSpeechLang,
        }),
      );

      setSource(wordSelect.target);
      setSourceSpeechLang(wordSelect.targetSpeechLang);
      setTarget(wordSelect.source);
      setTargetSpeechLang(wordSelect.sourceSpeechLang);
    }
    didMountRef.current = true;
  }, [changer]);

  useEffect(() => {
    if (netInfo.isConnected === false) {
      setVisibleLoading(false);
    } else if (isDown.isDownloading === true) {
      setVisibleLoading(true);
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    const interval = setInterval(() => {
      MLKitTranslator.isModelDownloaded(downLang).then(e => {
        if (e === true && visibleLoading) {
          dispatch(setDownloading({...isDown, isDownloading: false}));
          setVisibleLoading(false);
          clearInterval(interval);
        } else {
          downloadModel(downLang);
        }
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [visibleLoading]);

  return (
    <>
      <SearchWord />
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
          placeholder="Language"
          onChange={(val: Lang) => {
            isDownload(val, true);
          }}
          value={checkFirst.source ? wordSelect.source : null}
          data={lang}
          imageField={''}
          labelField={'label'}
          valueField={'value'}
        />
      </View>
      {visibleAllowModal && (
        <View>
          <AllowModal
            download={download}
            content={content}
            show={visibleAllowModal}
            notShow={hiddenAllowModal}
          />
        </View>
      )}
      <View
        className="absolute self-center bg-white justify-center rounded-lg shadow-lg shadow-gray-900 border-gray-300"
        style={{width: wp('10%'), height: hp('5%'), top: hp('10.5%')}}>
        <IconButton
          iconColor="black"
          onPress={() => {
            if (changer) {
              setChanger(false);
              dispatch(setChange({change: false}));
            } else {
              setChanger(true);
              dispatch(setChange({change: true}));
            }
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
          placeholder="Language"
          onChange={(val: Lang) => {
            isDownload(val, false);
          }}
          value={checkFirst.target ? wordSelect.target : null}
          data={lang}
          labelField="label"
          valueField="value"
          imageField={''}
        />
      </View>
      {visibleLoading && (
        <View
          className="self-center w-max absolute opacity-70 bg-white rounded-lg "
          style={{top: hp('75%'), padding: hp('1%')}}>
          <Text
            className="text-black font-bold text-base text-center self-center"
            style={{
              fontSize: hp('2.1%'),
              lineHeight: hp('3.1%'),
            }}>
            The language pack is downloading!!!
          </Text>
          <ActivityIndicator
            className="self-center"
            animating={true}
            color={MD2Colors.black}
          />
        </View>
      )}
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
