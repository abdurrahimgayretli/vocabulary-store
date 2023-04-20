/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {fetchImage} from '../api';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {control, example, selectWord, setImage} from '../redux/state/word';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const WordImage = () => {
  const wordContent = useAppSelector(selectWord);
  const exampleContent = useAppSelector(example);
  const controlContent = useAppSelector(control);

  const dispatch = useAppDispatch();

  const {isLoading, isError, data, refetch} = useQuery(['images'], () =>
    wordContent.enWord.toLowerCase() === 'book'
      ? 'https://images.pexels.com/photos/612997/pexels-photo-612997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      : controlContent.control
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
