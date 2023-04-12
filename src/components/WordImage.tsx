/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {fetchImage} from '../api';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {control, example, selectWord, setImage} from '../redux/state/word';

const WordImage = () => {
  const wordContent = useAppSelector(selectWord);
  const exampleContent = useAppSelector(example);
  const controlContent = useAppSelector(control);

  const dispatch = useAppDispatch();

  const {isLoading, isError, data, refetch} = useQuery(['images'], () =>
    wordContent.enWord.toLowerCase() === 'book' || controlContent.control
      ? exampleContent.image
      : fetchImage(wordContent.enWord),
  );

  const [img, setImg] = React.useState(exampleContent.image);

  useEffect(() => {
    refetch();
  }, [wordContent.enWord]);

  useEffect(() => {
    if (data !== undefined) {
      dispatch(
        setImage({
          sentence: exampleContent.sentence,
          synonyms: exampleContent.synonyms,
          image: data,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (exampleContent.image !== null) {
      setImg(exampleContent.image);
    }
  }, [exampleContent.image]);

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
              uri: img,
            }}
          />
        </View>
      )}
    </>
  );
};

export default WordImage;
