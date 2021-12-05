import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {mockCards, mockOriginText} from './mocks/cards';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

let store = null;
let fakeApp: any = null;

describe('Application render', () => {

	beforeAll(() => {

		const createFakeStore = configureStore();
		store = createFakeStore({
			cards: {
				originText: mockOriginText,
				baseCards: mockCards,
				sourceCards: mockCards,
				checkCards : []
			}
		});

		fakeApp = (
			<Provider store={store}>
				<DndProvider backend={HTML5Backend}>
					<App />
				</DndProvider>
			</Provider>
		);
	});

	it('should render', () => {
		render(fakeApp);
	});
});