/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';
import {REACT_APP_OWLBOT_KEY, REACT_APP_PIXEL_KEY} from '@env';

export const exampleSentences = async (word: string) => {
  console.log('sentences');
  const {data} = await axios.get(
    `https://owlbot.info/api/v4/dictionary/${word}`,
    {
      headers: {
        Authorization: REACT_APP_OWLBOT_KEY,
      },
    },
  );
  return data.definitions[0].example;
};

export const fetchImage = async (word: string) => {
  console.log('image');

  const {data} = await axios.get(
    `https://api.pexels.com/v1/search?query=${word}&per_page=1`,
    {
      headers: {
        Authorization: REACT_APP_PIXEL_KEY,
      },
    },
  );
  return data.photos[0].src.original;
};

export const fetchSynonyms = async (word: string) => {
  console.log('synonyms');
  const {data} = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  );
  return data[0].meanings;
};
