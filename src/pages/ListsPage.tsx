import React, {useCallback, useEffect, useState} from 'react';
import {View, VStack, Box, Text} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {Lists, useQuery, useRealm} from '../models/Lists';
import AddListModal from '../components/AddListModal';
import PushNotification from 'react-native-push-notification';
import {IconButton} from 'react-native-paper';

const ListsPage = ({navigation}: any) => {
  const lists = useQuery<any>('List');

  const [notifyName, setNotifyName] = useState('');
  const [visible, setVisible] = React.useState(false);
  const hidden = () => setVisible(false);

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
      notification.length !== 0 && setNotifyName(notification[0].title);
    });
  };

  const showNotificationSchedule = (listName: string) => {
    PushNotification.localNotificationSchedule({
      allowWhileIdle: true,
      title: listName,
      message: notifyMessage(listName),
      channelId: '5',
      date: new Date(Date.now() + 15 * 1000),
      repeatType: 'time',
      repeatTime: 15 * 1000,
    });
  };

  const notifyMessage = (listName: string) => {
    const randomNumber = Math.random();
    const word = lists.filter(val => val.listName === listName)[0].words[
      Math.floor(
        randomNumber *
          lists.filter(val => val.listName === listName)[0].words.length,
      )
    ].word;
    const trans = lists.filter(val => val.listName === listName)[0].words[
      Math.floor(
        randomNumber *
          lists.filter(val => val.listName === listName)[0].words.length,
      )
    ].transWord;
    const from = lists
      .filter(val => val.listName === listName)[0]
      .words[
        Math.floor(
          randomNumber *
            lists.filter(val => val.listName === listName)[0].words.length,
        )
      ].from.split('-')[0]
      .toUpperCase();
    const to = lists
      .filter(val => val.listName === listName)[0]
      .words[
        Math.floor(
          randomNumber *
            lists.filter(val => val.listName === listName)[0].words.length,
        )
      ].to.split('-')[0]
      .toUpperCase();

    return from + ' > ' + word + ' = ' + trans + ' < ' + to;
  };

  useEffect(() => {
    changeIconFun();
  });

  return (
    <View className="w-[100%] h-[100%] bg-slate-300">
      {visible && (
        <View className="">
          <AddListModal
            show={visible}
            notShow={hidden}
            addList={handleAddList}
          />
        </View>
      )}
      <VStack className="w-[90%] h-[100%] top-[2vh] self-center">
        <ScrollView>
          {lists.map(val => (
            <Box key={val._id} className=" mt-[0.5vh] h-[6vh] w-[100%] ">
              <View
                onTouchStart={() => {
                  navigation.navigate("Word's List", val.listName);
                }}
                className="h-[5vh] w-[70%] bg-white rounded-lg justify-center">
                <Text className="font-serif font-black text-lg absolute left-[2vh]">
                  {val.listName}
                </Text>
              </View>
              <View className="absolute rounded-lg self-end -top-[1vh]">
                <IconButton
                  size={28}
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

              <View className="absolute self-end -top-[1vh] right-[5vh]">
                {val.listName !== notifyName ? (
                  <IconButton
                    iconColor="black"
                    size={28}
                    onPress={() => {
                      PushNotification.cancelAllLocalNotifications();
                      showNotificationSchedule(val.listName);
                      setNotifyName(val.listName);
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
        <View className="h-[6vh] w-[6vh] rounded-lg absolute bottom-[6vh] right-[2vh] self-end">
          <IconButton
            iconColor={'blue'}
            size={48}
            onPress={() => {
              setVisible(true);
            }}
            icon={require('../../assets/playlist-add.png')}
          />
        </View>
      </VStack>
    </View>
  );
};

export default ListsPage;
