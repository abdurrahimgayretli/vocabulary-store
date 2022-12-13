/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {Modal, Portal} from 'react-native-paper';
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
            width: 300,
            borderRadius: 8,
            height: 150,
            backgroundColor: 'white',
          }}>
          <HStack space={18} className="self-center">
            <VStack space={4}>
              <Text className="text-gray-500 text-xs w-[25vh]">
                List's Name
              </Text>
              <Input
                onChangeText={onChangeText}
                className="w-[20vh]"
                placeholder="My List"
              />
            </VStack>
            <VStack space={4}>
              <Text className="text-gray-500 text-xs">Confirm</Text>
              <IconButton
                isDisabled={!(text.length >= 2)}
                onPress={() => {
                  props.notShow();
                  props.addList(text);
                }}
                className="h-[6vh] w-[6vh] rounded-lg"
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
