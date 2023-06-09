/* eslint-disable react-hooks/exhaustive-deps */
import {Popover, Box, View, Text, ScrollView} from 'native-base';
import React, {useCallback, useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Lists, useQuery, useRealm} from '../models/Lists';
import {useAppSelector} from '../redux/hooks';
import {wordContent} from '../redux/state/word';
import {Words} from '../models/Words';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AddListPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const lists = useQuery<Lists>('List');
  const realm = useRealm();

  const wordContents = useAppSelector(wordContent);

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
              style={{width: wp('10%'), height: hp('5%')}}
            />
          );
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}>
        <Popover.Content
          accessibilityLabel="Select List"
          style={{width: wp('72%'), top: hp('2.5%'), left: wp('8%')}}>
          <Popover.Arrow style={{top: hp('3%')}} />
          <Popover.CloseButton />
          <Popover.Header>Select List</Popover.Header>
          <Popover.Body>
            <ScrollView>
              {lists.map((val: Lists) => (
                <Box
                  key={String(val._id)}
                  style={{
                    width: wp('64%'),
                    height: hp('5%'),
                    marginBottom: hp('1%'),
                  }}>
                  <View
                    onTouchEnd={() => {
                      setIsOpen(false);
                      handleAddWord(
                        wordContents.word,
                        wordContents.transWord,
                        wordContents.sourceSpeechLang,
                        wordContents.targetSpeechLang,
                        val.listName,
                      );
                    }}
                    className="h-[100%] self-center w-[90%] bg-slate-300 rounded-lg justify-center">
                    <Text
                      className="font-serif font-black absolute"
                      style={{
                        fontSize: hp('2.5%'),
                        lineHeight: hp('3%'),
                        left: wp('4%'),
                      }}>
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
