/* eslint-disable @typescript-eslint/no-shadow */
import React, {useCallback, useEffect} from 'react';
import {
  View,
  IconButton,
  VStack,
  Box,
  Text,
  AddIcon,
  CloseIcon,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {Lists, useQuery, useRealm} from '../models/Lists';
import AddListModal from '../components/AddListModal';

const ListsPage = ({navigation}: any) => {
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
  const lists = useQuery<any>('List');

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
            <>
              <Box key={val._id} className=" mt-[1vh] h-[5vh] w-[100%] ">
                <View
                  onTouchStart={() => {
                    navigation.navigate("Word's List", val.listName);
                  }}
                  className="h-[100%] w-[85%] bg-white rounded-lg justify-center">
                  <Text className="font-serif font-black text-lg absolute left-[2vh]">
                    {val.listName}
                  </Text>
                </View>
                <IconButton
                  onPress={() => {
                    realm.write(() => {
                      realm.delete(
                        realm.objects('List').filter((listObj: any) => {
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
                  className="h-[4vh] w-[4vh] rounded-lg self-end -top-[4.5vh]"
                  colorScheme="red"
                  icon={<CloseIcon />}
                  variant="solid"
                />
              </Box>
            </>
          ))}
        </ScrollView>
        <IconButton
          onPress={() => {
            setVisible(true);
          }}
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
