/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useCallback} from 'react';
import {View, IconButton, VStack, Box, Text, AddIcon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {Lists, useQuery, useRealm} from '../models/Lists';

const ListsPage = ({navigation}: any) => {
  const [listName, setListName] = useState('');

  const realm = useRealm();
  const handleAddList = useCallback(
    (listName: string): void => {
      if (!listName) {
        return;
      }
      realm.write(() => {
        realm.create('List', Lists.generate(listName));
      });
    },
    [realm],
  );
  const lists = useQuery<any>('List');

  return (
    <View className="w-[100%] h-[100%] bg-lime-100">
      <VStack className="w-[90%] h-[100%] top-[2vh] self-center">
        <ScrollView>
          {lists.map(val => (
            <>
              <Box className="bg-white rounded-lg justify-center mt-[1vh] h-[5vh]">
                <View
                  onTouchStart={() => {
                    navigation.navigate("Word's List", val.listName);
                  }}
                  className="w-[100%] justify-center h-[100%]">
                  <Text className="font-serif font-black text-lg absolute left-[2vh]">
                    {val.listName}
                  </Text>
                </View>
              </Box>
            </>
          ))}
        </ScrollView>
        <IconButton
          onPress={() => handleAddList('My List 2')}
          className="h-[6vh] w-[6vh] rounded-lg absolute bottom-[4vh] self-end"
          colorScheme="blue"
          icon={<AddIcon />}
          variant="solid"
        />
      </VStack>
    </View>
  );
};

export default ListsPage;
