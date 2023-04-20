/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
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

const AddListModal = (props: any) => {
  const [text, onChangeText] = React.useState('');
  return (
    <Portal>
      <NativeBaseProvider>
        <Modal
          visible={props.show}
          onDismiss={props.notShow}
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
                List's Name
              </Text>
              <Input
                onChangeText={onChangeText}
                placeholder="My List"
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
                isDisabled={!(text.length >= 2)}
                onPress={() => {
                  props.notShow();
                  props.addList(text);
                }}
                className="h-[6vh] w-[6vh] rounded-lg"
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

export default AddListModal;
