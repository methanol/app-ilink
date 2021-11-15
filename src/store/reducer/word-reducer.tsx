import {createReducer} from '@reduxjs/toolkit';
import { idText } from 'typescript';

import {addWordToCheckArea, addWordToSourceArea, moveWordInsideSourceArea, moveWordInsideCheckArea} from '../actions';

export interface SingleWord {
  id: number,
	text: string,
}

function updateWordsList(words: SingleWord[], word: SingleWord, newIndex: number) {
  const newList = words.slice();
	const activeCardIndex = newList.findIndex((it) => it.id === word.id);
	newList.splice(activeCardIndex, 1);
	newList.splice(newIndex, 0, word);
  return newList;
}

function addWordToList(words: SingleWord[] | [], word: SingleWord) {
  const newList = words.slice();
	const newIndex = words.length ? words.length : 0;
	newList.splice(newIndex, 0, word);
  return newList;
}

function removeWordFromList(words: SingleWord[], word: SingleWord) {
  const newList = words.slice();
	const activeCardIndex = newList.findIndex((it) => it.id === word.id);
	newList.splice(activeCardIndex, 1);
  return newList;
}

const initState: {baseCards: any, sourceCards: any, checkCards: any, originText: any} = {
	originText: {
		correctAnswerKey: 362491,
		text: 'Игра Скайрим вышла десять лет назад',
	},
	baseCards: [
		{
			id: 1,
			text: 'ago',
		},
		{
			id: 2,
			text: 'developed',
		},
		{
			id: 3,
			text: 'Skyrim',
		},
		{
			id: 4,
			text: 'ten',
		},
		{
			id: 5,
			text: 'two',
		},
		{
			id: 6,
			text: 'was',
		},
		{
			id: 7,
			text: 'were',
		},
		{
			id: 8,
			text: 'year',
		},
		{
			id: 9,
			text: 'years',
		},
	],
	sourceCards: [
		{
			id: 1,
			text: 'ago',
		},
		{
			id: 2,
			text: 'developed',
		},
		{
			id: 3,
			text: 'Skyrim',
		},
		{
			id: 4,
			text: 'ten',
		},
		{
			id: 5,
			text: 'two',
		},
		{
			id: 6,
			text: 'was',
		},
		{
			id: 7,
			text: 'were',
		},
		{
			id: 8,
			text: 'year',
		},
		{
			id: 9,
			text: 'years',
		},
	],
	checkCards : []
}

const wordCardReducer = createReducer(initState, (builder) => {
  builder
    .addCase(addWordToCheckArea, (state, action) => {
      state.checkCards = addWordToList(state.checkCards, action.payload.card)
      state.sourceCards = removeWordFromList(state.sourceCards, action.payload.card)
    })
    .addCase(addWordToSourceArea, (state, action) => {
      state.sourceCards = addWordToList(state.sourceCards, action.payload.card)
      state.checkCards = removeWordFromList(state.checkCards, action.payload.card)
    })
    .addCase(moveWordInsideSourceArea, (state, action) => {
      state.sourceCards = updateWordsList(state.sourceCards, action.payload.card, action.payload.newIndex);
    })
    .addCase(moveWordInsideCheckArea, (state, action) => {
      state.checkCards = updateWordsList(state.checkCards, action.payload.card, action.payload.newIndex);
    });
});

export default wordCardReducer;