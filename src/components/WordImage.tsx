/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {fetchImage} from '../api';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {control, example, wordContent, setExample} from '../redux/state/word';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const WordImage = () => {
  const wordContents = useAppSelector(wordContent);
  const exampleContent = useAppSelector(example);
  const controlContent = useAppSelector(control);

  const dispatch = useAppDispatch();

  const {isLoading, isError, data, refetch} = useQuery(['images'], () =>
    wordContents.enWord === 'Vocabulary Store'
      ? 'https://images.pexels.com/photos/3643925/pexels-photo-3643925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      : controlContent.control
      ? exampleContent.image
      : fetchImage(wordContents.enWord),
  );

  const [img, setImg] = useState(exampleContent.image);

  useEffect(() => {
    refetch();
  }, [wordContents.enWord]);

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setExample({...exampleContent, image: data}));
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
        <View
          className="w-full self-center justify-center absolute"
          style={{height: hp('30%'), top: hp('55%')}}>
          <ActivityIndicator
            className="self-center"
            animating={true}
            color={MD2Colors.red800}
          />
        </View>
      )}
      {isError ? (
        <Image
          className="w-full rounded-lg self-center absolute"
          source={require('../../assets/Image_not_available.png')}
          style={{height: hp('30%'), top: hp('55%')}}
        />
      ) : (
        <View
          className="shadow-lg shadow-gray-900 w-full rounded-lg self-center absolute"
          style={{height: hp('30%'), top: hp('55%')}}>
          <Image
            className="object-fill h-full w-full rounded-lg"
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
