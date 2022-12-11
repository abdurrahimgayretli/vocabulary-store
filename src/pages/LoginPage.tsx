import React from 'react';
import {VStack, View, Button} from 'native-base';

const LoginPage = ({navigation}: any) => {
  return (
    <View className="h-[100%] w-[100%] justify-center bg-slate-800">
      <VStack space={4} className="w-[60%] self-center">
        <Button
          variant={'subtle'}
          onPress={() => {
            navigation.navigate('Translate');
          }}>
          Translate
        </Button>
        <Button
          variant={'subtle'}
          onPress={() => {
            navigation.navigate('Lists of Words');
          }}>
          Lists of Words
        </Button>
      </VStack>
    </View>
  );
};

export default LoginPage;
