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

const AddRemindModal = (props: any) => {
  const [time, setTime] = React.useState('');

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
            width: 300,
            borderRadius: 8,
            height: 150,
            backgroundColor: 'white',
          }}>
          <HStack space={18} className="self-center">
            <VStack space={4}>
              <Text className="text-gray-500 text-xs w-[25vh]">Interval</Text>
              <Input
                onChangeText={setTime}
                keyboardType={'numeric'}
                className="w-[20vh]"
                placeholder="Enter interval (minute)"
              />
            </VStack>
            <VStack space={4}>
              <Text className="text-gray-500 text-xs">Confirm</Text>
              <IconButton
                isDisabled={!(time.length >= 1)}
                onPress={() => {
                  props.notShow();
                  for (var i = 0; i < props.size; i++) {
                    props.addRemind(Number(time), i, String(props.listName));
                  }
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

export default AddRemindModal;
