/* eslint-disable react-hooks/exhaustive-deps */
import {Popover, Box, View, Text, ScrollView} from 'native-base';
import React, {useCallback, useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Lists, useQuery, useRealm} from '../models/Lists';
import {useAppSelector} from '../redux/hooks';
import {selectWord} from '../redux/state/word';
import {Words} from '../models/Words';

const AddListPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const lists = useQuery<Lists>('List');
  const realm = useRealm();

  const wordContent = useAppSelector(selectWord);

  const handleAddWord = useCallback(
    (
      word: string,
      transWord: string,
      source: string,
      target: string,
      listName: string,
    ): void => {
      if (!word) {
        return;
      }
      realm.write(() => {
        const newWord: Words = realm.create(
          'Word',
          Words.generate(word, transWord, source, target),
        );
        lists.filter(val => val.listName === listName)[0].words.push(newWord);
      });
    },
    [realm],
  );

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
              {lists.map((val: Lists) => (
                <Box
                  key={Number(val._id)}
                  className="mb-[1vh] h-[5vh] w-[100%] ">
                  <View
                    onTouchEnd={() => {
                      setIsOpen(false);
                      handleAddWord(
                        wordContent.word,
                        wordContent.transWord,
                        wordContent.sourceSpeechLang,
                        wordContent.targetSpeechLang,
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
