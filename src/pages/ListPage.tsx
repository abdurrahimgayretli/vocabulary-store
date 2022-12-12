import React, {useEffect} from 'react';
import {View, IconButton, VStack, Box, Text, CloseIcon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery, useRealm} from '../models/Lists';
import CountryFlag from 'react-native-country-flag';

const ListPage = ({navigation}: any) => {
  const words = useQuery<any>('Word');

  const realm = useRealm();

  useEffect(() => {
    console.log(words);
    console.log(
      words.filter(
        val => val.listName === navigation.getState().routes[2].params,
      ),
    );
  }, [words]);

  return (
    <View className="w-[100%] h-[100%] bg-lime-">
      <VStack className="w-[95%] h-[100%] top-[2vh] self-center">
        <ScrollView>
          {words
            .filter(
              val => val.listName === navigation.getState().routes[2].params,
            )
            .map(val => (
              <>
                <Box
                  key={val._id}
                  className="mt-[1vh] bg-white rounded-lg h-[10vh] w-[90%]">
                  <View className="absolute left-[2vh] top-[1vh]">
                    <CountryFlag
                      style={{borderRadius: 4}}
                      isoCode={String(val.from).split('-')[1]}
                      size={24}
                    />
                  </View>

                  <Text className="top-[5vh] capitalize font-serif font-black text-lg absolute self-center">
                    {val.word + ' = ' + val.transWord}
                  </Text>
                  <View className="absolute right-[2vh] top-[1vh] self-end">
                    <CountryFlag
                      style={{borderRadius: 4}}
                      isoCode={String(val.to).split('-')[1]}
                      size={24}
                    />
                  </View>
                </Box>
                <IconButton
                  onPress={() => {
                    realm.write(() => {
                      realm.delete(
                        realm.objects('Word').filter((wordObj: any) => {
                          return String(wordObj._id) === String(val._id);
                        }),
                      );
                    });
                  }}
                  className="h-[4vh] w-[4vh] rounded-lg self-end -top-[7vh]"
                  colorScheme="red"
                  icon={<CloseIcon />}
                  variant="solid"
                />
              </>
            ))}
        </ScrollView>
      </VStack>
    </View>
  );
};

export default ListPage;
