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
  source: LANG_TAGS_TYPE;
  target: LANG_TAGS_TYPE;
  isDownloading: boolean;
  downLang: LANG_TAGS_TYPE;
}

export interface FirstType {
  source: boolean;
  target: boolean;
}
export interface WordState {
  wordContent: WordType;
  wordExample: ExampleType;
  wordControl: ControlType;
  wordFirst: FirstType;
}

const initialState: WordState = {
  wordContent: {
    word: 'Welcome To',
    transWord: 'Vocabulary Store',
    enWord: 'Vocabulary Store',
    source: 'ENGLISH',
    sourceSpeechLang: 'en-GB',
    target: 'ENGLISH',
    targetSpeechLang: 'en-GB',
  },
  wordExample: {
    image:
      'https://images.pexels.com/photos/3643925/pexels-photo-3643925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    sentence: 'Welcome to Vocabulary Store',
    synonyms: [
      {
        partOfSpeech: 'noun',
        synonyms: ['Vocabulary', 'Store'],
      },
    ],
  },
  wordControl: {
    control: false,
    source: 'ENGLISH',
    target: 'ENGLISH',
    isDownloading: false,
    downLang: 'ENGLISH',
  },
  wordFirst: {source: false, target: false},
};

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    setWordContent: (state, action: PayloadAction<WordType>) => {
      state.wordContent = action.payload;
    },
    setExample: (state, action: PayloadAction<ExampleType>) => {
      state.wordExample = action.payload;
    },
    setControl: (state, action: PayloadAction<ControlType>) => {
      state.wordControl = action.payload;
    },
    setFirst: (state, action: PayloadAction<FirstType>) => {
      state.wordFirst = action.payload;
    },
  },
});

export const {setWordContent} = wordSlice.actions;
export const {setExample} = wordSlice.actions;
export const {setControl} = wordSlice.actions;
export const {setFirst} = wordSlice.actions;

export const selectWord = (state: RootState) => state.word.wordContent;
export const example = (state: RootState) => state.word.wordExample;
export const control = (state: RootState) => state.word.wordControl;
export const first = (state: RootState) => state.word.wordFirst;

export default wordSlice.reducer;
