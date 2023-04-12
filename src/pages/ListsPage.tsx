import React, {useCallback, useEffect, useState} from 'react';
import {View, VStack, Box, Text} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {Lists, useQuery, useRealm} from '../models/Lists';
import AddListModal from '../components/AddListModal';
import PushNotification from 'react-native-push-notification';
import {IconButton} from 'react-native-paper';
import AddRemindModal from '../components/AddRemindModal';

const ListsPage = ({navigation}: any) => {
  const lists = useQuery<Lists>('List');

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
      title: listName,
      message: notifyMessage(size, listName),
      channelId: '5',
      date: new Date(Date.now() + time * size * 1000),
    });
  };

  const notifyMessage = (size: number, listName: string) => {
    const word = lists.filter(val => val.listName === listName)[0].words[size]
      .word;
    const trans = lists.filter(val => val.listName === listName)[0].words[size]
      .transWord;
    const from = lists
      .filter(val => val.listName === listName)[0]
      .words[size].soruce.split('-')[0]
      .toUpperCase();
    const to = lists
      .filter(val => val.listName === listName)[0]
      .words[size].target.split('-')[0]
      .toUpperCase();

    return from + ' > ' + word + ' = ' + trans + ' < ' + to;
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
      <VStack className="w-[90%] h-[100%] top-[2vh] self-center">
        <ScrollView>
          {lists.map((val: Lists) => (
            <Box
              key={String(val._id)}
              className=" mt-[0.5vh] h-[6vh] w-[100%] ">
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
        <View className="h-[6vh] w-[6vh] rounded-lg absolute bottom-[6vh] right-[2vh] self-end">
          <IconButton
            iconColor={'black'}
            size={48}
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
