import React from 'react';
import {View, IconButton, VStack, Box, Text, CloseIcon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {Lists, useQuery, useRealm} from '../models/Lists';
import CountryFlag from 'react-native-country-flag';
import {Words} from '../models/Words';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ListPage = ({navigation}: any) => {
  const lists = useQuery<Lists>('List');
  const realm = useRealm();

  return (
    <View className="w-[100%] h-[100%] ">
      <VStack className="w-[95%] h-[95%] self-center" style={{top: hp('2%')}}>
        <ScrollView>
          {lists
            .filter(
              val => val.listName === navigation.getState().routes[2].params,
            )[0]
            .words.map((elem: Words) => (
              <Box
                key={String(elem._id)}
                className="rounded-lg w-[100%]"
                style={{marginTop: hp('1%'), height: hp('10%')}}>
                <View className="h-[100%] w-[90%] bg-white rounded-lg">
                  <View
                    className="absolute"
                    style={{left: wp('4%'), top: hp('1%')}}>
                    <CountryFlag
                      style={{borderRadius: 4}}
                      isoCode={String(elem.soruce).split('-')[1]}
                      size={hp('3.2%')}
                    />
                  </View>

                  <Text
                    className="capitalize font-serif font-black absolute self-center"
                    style={{
                      top: hp('5%'),
                      fontSize: hp('2.4%'),
                      lineHeight: hp('3.5%'),
                    }}>
                    {elem.word + ' = ' + elem.transWord}
                  </Text>
                  <View
                    className="absolute self-end"
                    style={{right: wp('4%'), top: hp('1%')}}>
                    <CountryFlag
                      style={{borderRadius: 4}}
                      isoCode={String(elem.target).split('-')[1]}
                      size={hp('3.2%')}
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
                  className="rounded-lg self-end"
                  style={{top: hp('-7%'), height: hp('4%'), width: wp('8.5%')}}
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
