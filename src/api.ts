/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';
import {
  REACT_APP_OWLBOT_KEY,
  REACT_APP_OXFORD_ID,
  REACT_APP_OXFORD_KEY,
  REACT_APP_PIXEL_KEY,
  REACT_APP_SERP_KEY,
} from '@env';

// export const exampleSentences = async (word: string) => {
//   const {data} = await axios.get(
//     `https://od-api.oxforddictionaries.com:443/api/v2/sentences/en/${word}?strictMatch=false`,
//     {
//       headers: {
//         app_id: REACT_APP_OXFORD_ID,
//         app_key: REACT_APP_OXFORD_KEY,
//         language: 'en-gb',
//       },
//     },
//   );
//   return data.results[0].lexicalEntries[0].sentences[0].text;
// };
export const exampleSentences = async (word: string) => {
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

// export const fetchImage = async (word: string, language: string) => {
//   const {data} = await axios.get(
//     `https://serpapi.com/search.json?q=${word}&tbm=isch&ijn=0`,
//     {
//       params: {
//         api_key: REACT_APP_SERP_KEY,
//         hl: `${language}`,
//       },
//     },
//   );
//   return data.images_results[0].thumbnail;
// };

export const fetchImage2 = async (word: string) => {
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
