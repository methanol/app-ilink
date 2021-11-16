import wordCardReducer from './word-reducer';
import {mockOriginText} from '../../mocks/cards';
import {ActionType} from '../actions';

const initState = {
	originText: mockOriginText,
	baseCards: [],
	sourceCards: [],
	checkCards : []
};

const changedState = Object.assign({}, initState);
const card = {id: 2, text: 'info'};

describe('Card reducer testing', () => {
	it('should add word to check', () => {
		const addWordToCheckAreaAction = {
			type: ActionType.WORD_TO_CHECK,
			payload: {card},
		};

		expect(wordCardReducer(changedState, addWordToCheckAreaAction))
			.toEqual(Object.assign(changedState, {checkCards: [{id: 2, text: 'info'}]}));
	});
	it('should add word to source', () => {
		const addWordToSourceAreaAction = {
			type: ActionType.WORD_TO_SOURCE,
			payload: {card},
		};

		expect(wordCardReducer(Object.assign(changedState, {checkCards: []}), addWordToSourceAreaAction))
			.toEqual(Object.assign(changedState, {sourceCards: [{id: 2, text: 'info'}]}));
	});
});