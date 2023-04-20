import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {VStack, View, Button, Image} from 'native-base';

const LoginPage = ({navigation}: any) => {
  return (
    <View className="h-[100%] w-[100%] justify-center">
      <VStack space={4} className="w-[60%] self-center">
        <View className=" self-center" style={{bottom: hp('5%')}}>
          <Image
            alt=""
            source={require('../../assets/ic_launcher_foreground2.png')}
          />
        </View>
        <Button
          variant={'solid'}
          onPress={() => {
            navigation.navigate('Translate');
          }}>
          Translate
        </Button>
        <Button
          variant={'solid'}
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
