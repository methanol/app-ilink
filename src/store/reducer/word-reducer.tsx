import {createReducer} from '@reduxjs/toolkit';

import {addWordToCheckArea, addWordToSourceArea, moveWordInsideSourceArea, moveWordInsideCheckArea, makeWordMoving} from '../actions';
import {mockCards, mockOriginText} from '../../mocks/cards';
import {SingleWord, WordsState} from '../../utils';

function updateWordsList(words: SingleWord[], word: SingleWord, newIndex: number) {
	const newList = words.slice();
	const activeCardIndex = newList.findIndex((it) => it.id === word.id);
	newList.splice(activeCardIndex, 1);
	newList.splice(newIndex, 0, word);
	return newList;
}

function addWordToList(words: SingleWord[] | [], word: SingleWord, atIndex?: number) {
	const newList = words.slice();
	if (atIndex || atIndex === 0) {
		newList.splice(atIndex, 0, word);
	} else {
		newList.push(word);
	}
	return newList;
}

function addWordToSourceList(words: SingleWord[] | [], word: SingleWord) {
  const newList = words.slice();
	const newIndex = words.length ? words.length : 0;
	newList.splice(newIndex, 0, word);

	return newList;
}

function makeSortingMoving(words: SingleWord[]) {
  const newList = words.slice();

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
	if (activeCardIndex !== -1)
	{
		newList.splice(activeCardIndex, 1);
	}
	return newList;
}

const initState: WordsState = {
	originText: mockOriginText,
	baseCards: mockCards,
	sourceCards: mockCards,
	checkCards : []
}

const wordCardReducer = createReducer(initState, (builder) => {
	builder
		.addCase(addWordToCheckArea, (state, action) => {
			state.checkCards = addWordToList(state.checkCards, action.payload.card, action.payload.atIndex);
			state.sourceCards = removeWordFromList(state.sourceCards, action.payload.card);
		})
		.addCase(addWordToSourceArea, (state, action) => {
			state.sourceCards = addWordToSourceList(state.sourceCards, action.payload.card);
			state.checkCards = removeWordFromList(state.checkCards, action.payload.card);
		})
		.addCase(makeWordMoving, (state, action) => {
			state.sourceCards = makeSortingMoving(state.sourceCards)
		})
		.addCase(moveWordInsideSourceArea, (state, action) => {
			state.sourceCards = updateWordsList(state.sourceCards, action.payload.card, action.payload.newIndex);
		})
		.addCase(moveWordInsideCheckArea, (state, action) => {
			state.checkCards = updateWordsList(state.checkCards, action.payload.card, action.payload.newIndex);
		});
});

export default wordCardReducer;