import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
	WORD_TO_CHECK: 'data/moveWordToCheckArea',
	WORD_TO_SOURCE: 'data/moveWordToSourceArea',
	WORD_INTO_CHECK: 'data/moveWordInsideCheckArea',
	WORD_INTO_SOURCE: 'data/moveWordInsideSourceArea',
	SORT_WORDS: 'data/moveWordMoving',
};

export const addWordToCheckArea = createAction(ActionType.WORD_TO_CHECK, (card, atIndex) => ({
	payload: {card, atIndex},
}));

export const addWordToSourceArea = createAction(ActionType.WORD_TO_SOURCE, (card) => ({
	payload: {card},
}));

export const makeWordMoving = createAction(ActionType.SORT_WORDS);

export const moveWordInsideSourceArea = createAction(ActionType.WORD_INTO_SOURCE, (card, newIndex) => ({
	payload: {card, newIndex},
}));

export const moveWordInsideCheckArea = createAction(ActionType.WORD_INTO_CHECK, (card, newIndex) => ({
	payload: {card, newIndex},
}));


