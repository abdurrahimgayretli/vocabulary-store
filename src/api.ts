/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';
import {
  REACT_APP_OXFORD_ID,
  REACT_APP_OXFORD_KEY,
  REACT_APP_SERP_KEY,
} from '@env';

export const exampleSentences = async (word: string) => {
  const {data} = await axios.get(
    `https://od-api.oxforddictionaries.com:443/api/v2/sentences/en/${word}?strictMatch=false`,
    {
      headers: {
        app_id: REACT_APP_OXFORD_ID,
        app_key: REACT_APP_OXFORD_KEY,
        language: 'en-gb',
      },
    },
  );
  return data.results[0].lexicalEntries[0].sentences[0].text;
};

export const fetchImage = async (word: string, language: string) => {
  const {data} = await axios.get(
    `https://serpapi.com/search.json?q=${word}&tbm=isch&ijn=0`,
    {
      params: {
        api_key: REACT_APP_SERP_KEY,
        hl: `${language}`,
      },
    },
  );
  return data.images_results[0].thumbnail;
};
