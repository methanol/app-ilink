import { combineReducers } from 'redux';
import {configureStore} from '@reduxjs/toolkit';

import wordCardReducer from './word-reducer';

const rootReducer = combineReducers({
  cards: wordCardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;