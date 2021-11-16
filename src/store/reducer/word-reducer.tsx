import {createReducer} from '@reduxjs/toolkit';
// import { idText } from 'typescript';

import {addWordToCheckArea, addWordToSourceArea, moveWordInsideSourceArea, moveWordInsideCheckArea} from '../actions';
import {mockCards, mockOriginText} from '../../mocks/cards';

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

function addWordToListWithSorting(words: SingleWord[] | [], word: SingleWord) {
  const newList = words.slice();
	const newIndex = words.length ? words.length : 0;
	newList.splice(newIndex, 0, word);

	newList.sort((a, b) => {
		if (a.id > b.id) {
			return 1;
		}
		if (a.id < b.id) {
			return -1;
		}
		return 0;
	});
	return newList;
}

function removeWordFromList(words: SingleWord[], word: SingleWord) {
  const newList = words.slice();
	const activeCardIndex = newList.findIndex((it) => it.id === word.id);
	newList.splice(activeCardIndex, 1);
	return newList;
}

const initState: {baseCards: any, sourceCards: any, checkCards: any, originText: any} = {
	originText: mockOriginText,
	baseCards: mockCards,
	sourceCards: mockCards,
	checkCards : []
}

const wordCardReducer = createReducer(initState, (builder) => {
	builder
		.addCase(addWordToCheckArea, (state, action) => {
			state.checkCards = addWordToList(state.checkCards, action.payload.card)
			state.sourceCards = removeWordFromList(state.sourceCards, action.payload.card)
		})
		.addCase(addWordToSourceArea, (state, action) => {
			state.sourceCards = addWordToListWithSorting(state.sourceCards, action.payload.card)
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