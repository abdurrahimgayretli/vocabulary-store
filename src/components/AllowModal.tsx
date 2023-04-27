/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {Button, Modal, Portal} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HStack, NativeBaseProvider, Text, VStack} from 'native-base';
import Tts from 'react-native-tts';
import {LANG_TAGS_TYPE} from 'react-native-mlkit-translate-text';

interface props {
  content: {
    lang?: LANG_TAGS_TYPE;
    type: string;
    message: string;
  };
  show: boolean;
  notShow: () => void;
  download?: (language: LANG_TAGS_TYPE) => void;
}

const AllowModal = ({content, notShow, show, download}: props) => {
  return (
    <Portal>
      <NativeBaseProvider>
        <Modal
          visible={show}
          onDismiss={notShow}
          contentContainerStyle={{
            alignSelf: 'center',
            width: wp('80%'),
            borderRadius: 8,
            height: hp('20%'),
            backgroundColor: 'white',
          }}>
          <HStack space={18} className="self-center">
            <VStack space={4}>
              <Text
                className="text-black text-center"
                style={{
                  width: wp('75%'),
                  fontSize: hp('1.5%'),
                  lineHeight: hp('2%'),
                }}>
                {content.message}
              </Text>
              <Button
                className="self-center"
                style={{width: wp('40%')}}
                mode="contained"
                buttonColor="#73be73"
                onPress={() => {
                  if (content.type === 'pack') {
                    download!(content.lang as LANG_TAGS_TYPE);
                    notShow();
                  } else if (content.type === 'sound') {
                    Tts.requestInstallData();
                  }
                }}>
                Yes
              </Button>
            </VStack>
          </HStack>
        </Modal>
      </NativeBaseProvider>
    </Portal>
  );
};

export default AllowModal;
