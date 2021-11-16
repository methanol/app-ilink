import React from 'react';
import {render, screen} from '@testing-library/react';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(<Header/>);
    expect(screen.getByText('Translate this sentence')).toBeInTheDocument();
  });
});