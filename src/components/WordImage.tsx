/* eslint-disable react-native/no-inline-styles */
import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {fetchImage} from '../api';

const WordImage = ({word}: {word: string}) => {
  const {isLoading, isError, data, refetch} = useQuery(['images'], () =>
    fetchImage(word),
  );
  const [imageURI, setImageURI] = useState('');

  React.useEffect(() => {
    refetch().then(() => {
      setImageURI(data);
      console.log(data);
    });
  }, [data, word, imageURI, refetch]);

  return (
    <>
      {isLoading && (
        <View className="w-[40vh] h-[30vh] self-center top-[60vh] justify-center absolute">
          <ActivityIndicator
            className="self-center"
            animating={true}
            color={MD2Colors.red800}
          />
        </View>
      )}
      {isError ? (
        <Image
          className="w-[40vh] h-[30vh] top-[60vh] rounded-lg self-center absolute"
          source={require('../../assets/Image_not_available.png')}
        />
      ) : (
        <Image
          className="w-[40vh] h-[30vh] top-[60vh] rounded-lg self-center absolute"
          source={{uri: imageURI}}
        />
      )}
    </>
  );
};

export default WordImage;
