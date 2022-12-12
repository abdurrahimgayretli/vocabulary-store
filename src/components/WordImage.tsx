/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {fetchImage2} from '../api';

const WordImage = ({word}: {word: string}) => {
  const {isLoading, isError, data, refetch} = useQuery(['images'], () =>
    fetchImage2(word === null ? 'book' : word),
  );
  const [imageURI, setImageURI] = useState(
    'https://images.pexels.com/photos/3358707/pexels-photo-3358707.png',
  );

  React.useEffect(() => {
    refetch().then(() => {
      setImageURI(data);
    });
  }, [data, word]);

  return (
    <>
      {isLoading && (
        <View className="w-[40vh] h-[30vh] self-center top-[55vh] justify-center absolute">
          <ActivityIndicator
            className="self-center"
            animating={true}
            color={MD2Colors.red800}
          />
        </View>
      )}
      {isError ? (
        <Image
          className="w-[40vh] h-[30vh] top-[55vh] rounded-lg self-center absolute"
          source={require('../../assets/Image_not_available.png')}
        />
      ) : (
        <View className="border-gray-900 border-4 w-[40vh] h-[30vh] top-[55vh] rounded-lg self-center absolute">
          <Image
            className="object-fill h-full w-full"
            source={{
              uri: imageURI,
            }}
          />
        </View>
      )}
    </>
  );
};

export default WordImage;
