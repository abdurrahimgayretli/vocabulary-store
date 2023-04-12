import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {LANG_TAGS_TYPE} from 'react-native-mlkit-translate-text';

export interface WordType {
  word: string;
  transWord: string;
  enWord: string;
  source: LANG_TAGS_TYPE;
  sourceSpeechLang: string;
  target: LANG_TAGS_TYPE;
  targetSpeechLang: string;
}
export interface ExampleType {
  image: string;
  sentence: string;
  synonyms: [{partOfSpeech: string; synonyms: string[]}];
}
export interface ControlType {
  control: boolean;
}
export interface WordState {
  wordContent: WordType;
  wordExample: ExampleType;
  wordControl: ControlType;
}

const initialState: WordState = {
  wordContent: {
    word: 'kitap',
    transWord: 'book',
    enWord: 'book',
    source: 'TURKISH',
    sourceSpeechLang: 'tr-TR',
    target: 'ENGLISH',
    targetSpeechLang: 'en-GB',
  },
  wordExample: {
    image: 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.png',
    sentence: 'A book of selected poems',
    synonyms: [
      {
        partOfSpeech: 'noun',
        synonyms: [
          'tome',
          'volume',
          'booklet',
          'libretto',
          'account',
          'record',
        ],
      },
    ],
  },
  wordControl: {control: false},
};

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    setWordContent: (state, action: PayloadAction<WordType>) => {
      state.wordContent = action.payload;
    },
    setImage: (state, action: PayloadAction<ExampleType>) => {
      state.wordExample.image = action.payload.image;
    },
    setSynonyms: (state, action: PayloadAction<ExampleType>) => {
      state.wordExample.synonyms = action.payload.synonyms;
    },
    setSentence: (state, action: PayloadAction<ExampleType>) => {
      state.wordExample.sentence = action.payload.sentence;
    },
    setControl: (state, action: PayloadAction<ControlType>) => {
      state.wordControl = action.payload;
    },
  },
});

export const {setWordContent} = wordSlice.actions;
export const {setSynonyms} = wordSlice.actions;
export const {setSentence} = wordSlice.actions;
export const {setImage} = wordSlice.actions;

export const {setControl} = wordSlice.actions;

export const selectWord = (state: RootState) => state.word.wordContent;
export const example = (state: RootState) => state.word.wordExample;
export const control = (state: RootState) => state.word.wordControl;

export default wordSlice.reducer;
