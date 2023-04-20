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

const AllowModal = (props: any) => {
  return (
    <Portal>
      <NativeBaseProvider>
        <Modal
          visible={props.show}
          onDismiss={props.notShow}
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
                Language pack not found!!!{'\n'}Would you like to install the
                language's sound pack?
              </Text>
              <Button
                className="self-center"
                style={{width: wp('40%')}}
                mode="contained"
                buttonColor="#73be73"
                onPress={() => {
                  Tts.requestInstallData();
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
