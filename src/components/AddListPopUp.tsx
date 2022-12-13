import {Popover, Box, View, Text, ScrollView} from 'native-base';
import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import {useQuery} from '../models/Lists';

const AddListPopUp = ({wordInfo, addWordToList}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const lists = useQuery<any>('List');

  return (
    <Box className="absolute">
      <Popover
        trigger={triggerProps => {
          return (
            <IconButton
              {...triggerProps}
              onPress={() => setIsOpen(true)}
              iconColor={'orange'}
              icon={require('../../assets/star.png')}
              style={{width: 30, height: 30}}
            />
          );
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}>
        <Popover.Content
          accessibilityLabel="Select List"
          className="w-[35vh] left-[2vh] top-[2.5vh]">
          <Popover.Arrow style={{top: 18}} />
          <Popover.CloseButton />
          <Popover.Header>Select List</Popover.Header>
          <Popover.Body>
            <ScrollView>
              {lists.map(val => (
                <Box key={val._id} className="mb-[1vh] h-[5vh] w-[100%] ">
                  <View
                    onTouchEnd={() => {
                      setIsOpen(false);
                      addWordToList(
                        wordInfo.word,
                        wordInfo.transWord,
                        wordInfo.fromSpeechLang,
                        wordInfo.toSpeechLang,
                        val.listName,
                      );
                    }}
                    className="h-[100%] self-center w-[90%] bg-slate-300 rounded-lg justify-center">
                    <Text className="font-serif font-black text-lg absolute left-[2vh]">
                      {val.listName}
                    </Text>
                  </View>
                </Box>
              ))}
            </ScrollView>
          </Popover.Body>
        </Popover.Content>
      </Popover>
    </Box>
  );
};

export default AddListPopUp;
