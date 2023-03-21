import React from 'react';
import {View, IconButton, VStack, Box, Text, CloseIcon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {Lists, useQuery, useRealm} from '../models/Lists';
import CountryFlag from 'react-native-country-flag';
import {Words} from '../models/Words';

const ListPage = ({navigation}: any) => {
  const lists = useQuery<Lists>('List');
  const realm = useRealm();

  return (
    <View className="w-[100%] h-[100%] bg-slate-300">
      <VStack className="w-[95%] h-[95%] top-[2vh] self-center">
        <ScrollView>
          {lists
            .filter(
              val => val.listName === navigation.getState().routes[2].params,
            )[0]
            .words.map((elem: Words) => (
              <Box
                key={String(elem._id)}
                className="mt-[1vh] rounded-lg h-[10vh] w-[100%]">
                <View className="h-[100%] w-[90%] bg-white rounded-lg">
                  <View className="absolute left-[2vh] top-[1vh]">
                    <CountryFlag
                      style={{borderRadius: 4}}
                      isoCode={String(elem.soruce).split('-')[1]}
                      size={24}
                    />
                  </View>

                  <Text className="top-[5vh] capitalize font-serif font-black text-lg absolute self-center">
                    {elem.word + ' = ' + elem.transWord}
                  </Text>
                  <View className="absolute right-[2vh] top-[1vh] self-end">
                    <CountryFlag
                      style={{borderRadius: 4}}
                      isoCode={String(elem.target).split('-')[1]}
                      size={24}
                    />
                  </View>
                </View>
                <IconButton
                  onPress={() => {
                    realm.write(() => {
                      realm.delete(
                        realm.objects('Word').filter((wordObj: any) => {
                          return String(wordObj._id) === String(elem._id);
                        }),
                      );
                    });
                  }}
                  className="h-[4vh] w-[4vh] rounded-lg self-end -top-[7vh]"
                  colorScheme="red"
                  icon={<CloseIcon />}
                  variant="solid"
                />
              </Box>
            ))}
        </ScrollView>
      </VStack>
    </View>
  );
};

export default ListPage;
