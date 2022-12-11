import React, {useEffect} from 'react';
import {View, IconButton, VStack, Box, Text, CloseIcon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery, useRealm} from '../models/Words';

const ListPage = ({navigation}: any) => {
  const words = useQuery<any>('Word');

  const realm = useRealm();

  useEffect(() => {
    console.log(words);
  }, [words]);

  return (
    <View className="w-[100%] h-[100%] bg-slate-900">
      <VStack className="w-[90%] h-[80%] top-[2vh] self-center">
        <ScrollView>
          {words.map(val => (
            <>
              <Box
                key={val._objectKey()}
                className="mt-[1vh] bg-white rounded-lg h-[6vh] justify-center">
                <Text className="font-serif font-black text-lg absolute left-[2vh]">
                  {val.word + ' => ' + val.transWord}
                </Text>
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
                  className="h-[4vh] w-[4vh] rounded-lg absolute self-end right-[2vh]"
                  colorScheme="red"
                  icon={<CloseIcon />}
                  variant="solid"
                />
              </Box>
            </>
          ))}
        </ScrollView>
      </VStack>
    </View>
  );
};

export default ListPage;
