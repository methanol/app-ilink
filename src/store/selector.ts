import { createSelector } from 'reselect';
import {SingleWord, WordsState} from '../utils';

export const getBaseCards = (state: {cards: WordsState}) => state.cards.baseCards;
export const getSourceCards = (state: {cards: WordsState}) => state.cards.sourceCards;
export const getCheckCards = (state: {cards: WordsState}) => state.cards.checkCards;
export const getOriginText = (state: {cards: WordsState}) => state.cards.originText;

export const createUserKeySelector = createSelector(
	getCheckCards,
	(cards: SingleWord[]) => Number(cards.map((it: SingleWord) => it.id).join('')
));

export const createTextForSpeechSelector = createSelector(
	getCheckCards,
	(cards: SingleWord[]) => cards.map((it: SingleWord) => it.text).join(' ')
);