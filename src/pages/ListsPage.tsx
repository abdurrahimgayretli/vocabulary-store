import React, {useCallback, useEffect, useState} from 'react';
import {View, VStack, Box, Text} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {Lists, useQuery, useRealm} from '../models/Lists';
import AddListModal from '../components/AddListModal';
import PushNotification from 'react-native-push-notification';
import {IconButton} from 'react-native-paper';
import AddRemindModal from '../components/AddRemindModal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ListsPage = ({navigation}: any) => {
  const lists = useQuery<Lists>('List');

  const flagList = (flag: string) => {
    return flag === 'TR'
      ? '\uD83C\uDDF9\uD83C\uDDF7'
      : flag === 'RU'
      ? '\uD83C\uDDF7\uD83C\uDDFA'
      : flag === 'CN'
      ? '\uD83C\uDDE8\uD83C\uDDF3'
      : flag === 'FR'
      ? '\uD83C\uDDEB\uD83C\uDDF7'
      : flag === 'IT'
      ? '\uD83C\uDDEE\uD83C\uDDF9'
      : flag === 'DE'
      ? '\uD83C\uDDE9\uD83C\uDDEA'
      : flag === 'ES'
      ? '\uD83C\uDDEA\uD83C\uDDF8'
      : flag === 'GB'
      ? '\uD83C\uDDEC\uD83C\uDDE7'
      : flag === 'JP'
      ? '\uD83C\uDDEF\uD83C\uDDF5'
      : flag === 'KR'
      ? '\uD83C\uDDF0\uD83C\uDDF7'
      : flag === 'PT'
      ? '\uD83C\uDDF5\uD83C\uDDF9'
      : flag === 'IN'
      ? '\uD83C\uDDEE\uD83C\uDDF3'
      : flag === 'SA'
      ? '\uD83C\uDDE6\uD83C\uDDEA'
      : '';
  };

  const [notifyName, setNotifyName] = useState('');
  const [sizeList, setListSize] = useState(0);
  const [visibleAddRemind, setVisibleAddRemind] = React.useState(false);
  const hiddenAddRemind = () => setVisibleAddRemind(false);

  const [visibleAddList, setVisibleAddList] = React.useState(false);
  const hiddenAddList = () => setVisibleAddList(false);

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

  const changeIconFun = () => {
    PushNotification.getScheduledLocalNotifications(notification => {
      notification.length !== 0
        ? setNotifyName(notification[0].title)
        : setNotifyName('');
    });
  };

  const showNotificationSchedule = (
    time: number,
    size: number,
    listName: string,
  ) => {
    PushNotification.localNotificationSchedule({
      allowWhileIdle: true,
      playSound: true,
      title: listName,
      message: notifyMessage(size, listName),
      channelId: '5',
      soundName: 'default',
      date: new Date(Date.now() + time * size * 1000 * 60),
    });
  };

  const notifyMessage = (size: number, listName: string) => {
    const word = lists.filter(val => val.listName === listName)[0].words[size]
      .word;
    const trans = lists.filter(val => val.listName === listName)[0].words[size]
      .transWord;
    const from = lists
      .filter(val => val.listName === listName)[0]
      .words[size].soruce.split('-')[1]
      .toUpperCase();
    const to = lists
      .filter(val => val.listName === listName)[0]
      .words[size].target.split('-')[1]
      .toUpperCase();

    return flagList(from) + ' ' + word + ' = ' + trans + ' ' + flagList(to);
  };

  useEffect(() => {
    changeIconFun();
  }, []);

  return (
    <View className="w-[100%] h-[100%] ">
      {visibleAddList && (
        <View>
          <AddListModal
            show={visibleAddList}
            notShow={hiddenAddList}
            addList={handleAddList}
          />
        </View>
      )}
      {visibleAddRemind && (
        <View>
          <AddRemindModal
            size={sizeList}
            setListName={setNotifyName}
            listName={notifyName}
            show={visibleAddRemind}
            notShow={hiddenAddRemind}
            addRemind={showNotificationSchedule}
          />
        </View>
      )}
      <VStack className="w-[90%] h-[100%] self-center" style={{top: hp('2%')}}>
        <ScrollView>
          {lists.map((val: Lists) => (
            <Box
              key={String(val._id)}
              className="w-[100%] "
              style={{marginTop: hp('0.5%'), height: hp('6%')}}>
              <View
                onTouchStart={() => {
                  navigation.navigate("Word's List", val.listName);
                }}
                className="w-[70%] bg-white rounded-lg justify-center"
                style={{height: hp('5%')}}>
                <Text
                  className="font-serif font-black absolute"
                  style={{
                    left: wp('4%'),
                    fontSize: hp('2.4%'),
                    lineHeight: hp('3.5%'),
                  }}>
                  {val.listName}
                </Text>
              </View>
              <View
                className="absolute rounded-lg self-end"
                style={{top: hp('-1.5%')}}>
                <IconButton
                  size={hp('4%')}
                  iconColor="red"
                  onPress={() => {
                    realm.write(() => {
                      realm.delete(
                        realm.objects<any>('List').filter((listObj: any) => {
                          return String(listObj._id) === String(val._id);
                        })[0].words,
                      );
                      realm.delete(
                        realm.objects('List').filter((listObj: any) => {
                          return String(listObj._id) === String(val._id);
                        }),
                      );
                    });
                  }}
                  icon={require('../../assets/close.png')}
                />
              </View>
              <View
                className="absolute self-end"
                style={{top: hp('-1.5%'), right: wp('10.5%')}}>
                {val.listName !== notifyName ? (
                  <IconButton
                    iconColor="black"
                    size={hp('4%')}
                    onPress={() => {
                      PushNotification.cancelAllLocalNotifications();

                      setNotifyName(val.listName);
                      setListSize(val.words.length);
                      setVisibleAddRemind(true);
                    }}
                    icon={require('../../assets/notifications-active.png')}
                  />
                ) : (
                  <IconButton
                    iconColor="black"
                    size={28}
                    onPress={() => {
                      PushNotification.cancelAllLocalNotifications();
                      setNotifyName('');
                    }}
                    icon={require('../../assets/notifications-off.png')}
                  />
                )}
              </View>
            </Box>
          ))}
        </ScrollView>
        <View
          className="rounded-lg absolute self-end"
          style={{
            height: hp('6%'),
            width: wp('12%'),
            right: wp('4%'),
            bottom: hp('6%'),
          }}>
          <IconButton
            iconColor={'black'}
            size={hp('6%')}
            onPress={() => {
              setVisibleAddList(true);
            }}
            icon={require('../../assets/playlist-add.png')}
          />
        </View>
      </VStack>
    </View>
  );
};

export default ListsPage;
