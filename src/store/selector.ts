import { createSelector } from 'reselect';

export const getBaseCards = (state: any) => state.cards.baseCards;
export const getSourceCards = (state: any) => state.cards.sourceCards;
export const getCheckCards = (state: any) => state.cards.checkCards;
export const getOriginText = (state: any) => state.cards.originText;

export const createUserKeySelector = createSelector(
  getCheckCards,
  (cards: any) => Number(cards.map((it: any) => it.id).join('')
));

export const createTextForSpeechSelector = createSelector(
  getCheckCards,
  (cards: any) => cards.map((it: any) => it.text).join(' ')
);