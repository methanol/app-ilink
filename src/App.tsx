import React from 'react';
import styled from 'styled-components';
import Header from './components/header/header';
import {CheckingArea} from './components/checking-area/checking-area';
import {SourceArea} from './components/source-area/source-area';
import ExampleArea from './components/example-area/example-area';
import {CheckButton} from './components/check-button/check-button';

const MainWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin: 0 auto 0 auto;
	width: 482px;
	background: #E5E5E5;
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
	border: 2px solid #4B4B4B;
	border-radius: 15px;
	position: relative;
`;

function App() {
	return (
		<MainWrapper>
			<Header/>
			<ExampleArea/>
			<CheckingArea/>
			<SourceArea/>
			<CheckButton/>
		</MainWrapper>
		);
	}

export default App;
