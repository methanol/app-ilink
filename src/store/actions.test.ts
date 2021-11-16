import {ActionType, addWordToCheckArea, addWordToSourceArea, moveWordInsideSourceArea, moveWordInsideCheckArea} from './actions';

const card = {id: 2, text: 'info'};
const newIndex = 2;

describe('Actions', () => {
	it('action creator for add word to check', () => {

		const expectedAction = {
			type: ActionType.WORD_TO_CHECK,
			payload: {card},
		};

		expect(addWordToCheckArea(card)).toEqual(expectedAction);
	});

	it('action creator for add word to source', () => {

		const expectedAction = {
			type: ActionType.WORD_TO_SOURCE,
			payload: {card},
		};

		expect(addWordToSourceArea(card)).toEqual(expectedAction);
	});

	it('action creator for move word inside source', () => {

		const expectedAction = {
			type: ActionType.WORD_INTO_SOURCE,
			payload: {card, newIndex},
		};

		expect(moveWordInsideSourceArea(card, newIndex)).toEqual(expectedAction);
	});

	it('action creator for move word inside check', () => {

		const expectedAction = {
			type: ActionType.WORD_INTO_CHECK,
			payload: {card, newIndex},
		};

		expect(moveWordInsideCheckArea(card, newIndex)).toEqual(expectedAction);
	});
});