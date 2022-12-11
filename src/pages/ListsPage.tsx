import React from 'react';
import {View, IconButton, VStack, Box, Text, AddIcon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

const ListsPage = ({navigation}: any) => {
  return (
    <View className="w-[100%] h-[100%] bg-slate-900">
      <VStack className="w-[90%] h-[80%] top-[2vh] self-center">
        <ScrollView>
          <Box className="bg-white rounded-lg h-[6vh] justify-center">
            <View
              onTouchStart={() => {
                navigation.navigate("Word's List");
              }}
              className="w-[100%] justify-center h-[100%]">
              <Text className="font-serif font-black text-lg absolute left-[2vh]">
                My List
              </Text>
            </View>

            <IconButton
              className="h-[4vh] w-[4vh] rounded-lg absolute self-end right-[2vh]"
              colorScheme="red"
              icon={<AddIcon />}
              variant="solid"
            />
          </Box>
        </ScrollView>
      </VStack>
    </View>
  );
};

export default ListsPage;
