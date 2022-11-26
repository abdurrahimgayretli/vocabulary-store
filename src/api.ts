/* eslint-disable prettier/prettier */

import axios from 'axios';

export const exampleSentences = async (word: string) => {
  const app_id = '41902270'; // insert your APP Id
  const app_key = '38ef2ca21baa70122fd6a5c429959c31'; // insert your APP Key

  const { data } = await axios
    .get(`https://od-api.oxforddictionaries.com:443/api/v2/sentences/en/${word}?strictMatch=false`, {
      headers: {
        app_id: app_id,
        app_key: app_key,
      },
    });
  return data.results[0].lexicalEntries[0].sentences[0].text;

};

