import React from 'react';
import {render, screen} from '@testing-library/react';
import {CheckButton} from './check-button';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {mockCards, mockOriginText} from '../../mocks/cards';
import userEvent from '@testing-library/user-event';

const mockStore = configureStore();
const store = mockStore({
  cards: {
		originText: mockOriginText,
		baseCards: mockCards,
		sourceCards: mockCards,
		checkCards : [mockCards[0]]
	}
});

describe('Component: CheckButton', () => {
  it('should render correctly', () => {
		const {container, getByText, queryByText} = render(
      <Provider store={store}>
        <CheckButton/>
      </Provider>,
    );
    expect(getByText('Check')).toBeInTheDocument();
    expect(getByText('The answer is correct!')).toBeInTheDocument();
    expect(getByText('The answer is correct!')).toHaveStyle({opacity: '0'});
    expect(getByText('Something wrong!')).toHaveStyle({opacity: '0'});
		userEvent.click(container.querySelector('.check-button'));
		expect(getByText('Something wrong!')).toHaveStyle({opacity: '1'});
  });
});