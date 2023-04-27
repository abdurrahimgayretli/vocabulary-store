/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {ToastAndroid} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  IconButton,
  CheckIcon,
  VStack,
} from 'native-base';

const AddRemindModal = (props: any) => {
  const [time, setTime] = useState('');

  return (
    <Portal>
      <NativeBaseProvider>
        <Modal
          visible={props.show}
          onDismiss={() => {
            props.notShow();
            props.setListName('');
          }}
          contentContainerStyle={{
            alignSelf: 'center',
            width: wp('85%'),
            borderRadius: 8,
            height: hp('20%'),
            backgroundColor: 'white',
          }}>
          <HStack space={18} className="self-center">
            <VStack space={4}>
              <Text
                className="text-gray-500"
                style={{
                  width: wp('53%'),
                  fontSize: hp('1.6%'),
                  lineHeight: hp('2%'),
                }}>
                Interval
              </Text>
              <Input
                onChangeText={setTime}
                keyboardType={'numeric'}
                placeholder="Enter interval (minute)"
                style={{width: wp('42%')}}
              />
            </VStack>
            <VStack space={4}>
              <Text
                className="text-gray-500"
                style={{
                  fontSize: hp('1.6%'),
                  lineHeight: hp('2%'),
                }}>
                Confirm
              </Text>
              <IconButton
                isDisabled={!(time.length >= 1)}
                onPress={() => {
                  props.notShow();
                  if (time.indexOf('-') === -1 && time.indexOf('.') === -1) {
                    for (var i = 0; i < props.size; i++) {
                      props.addRemind(Number(time), i, String(props.listName));
                    }
                  } else {
                    ToastAndroid.show(
                      'Please enter number only',
                      ToastAndroid.SHORT,
                    );
                  }
                }}
                className="rounded-lg"
                style={{
                  width: wp('13%'),
                  height: hp('6%'),
                }}
                colorScheme="green"
                icon={<CheckIcon />}
                variant="solid"
              />
            </VStack>
          </HStack>
        </Modal>
      </NativeBaseProvider>
    </Portal>
  );
};

export default AddRemindModal;
