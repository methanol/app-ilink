import React from 'react';
import styled from 'styled-components';

import {ExampleText} from './example-text';

const ExampleWrapper = styled.div`
	width: 100%;
	margin-bottom: 50px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

export default function ExampleArea() {
	return (
		<ExampleWrapper>
			<svg width="187" height="200" viewBox="0 0 187 200" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M151 57C151 88.4802 125.48 114 94 114C62.5198 114 37 88.4802 37 57C37 25.5198 62.5198 0 94 0C125.48 0 151 25.5198 151 57Z" fill="#6C6C6C"/>
				<path d="M186.24 187.526C187.081 194.1 181.627 199.5 175 199.5H12C5.37256 199.5 -0.0808166 194.1 0.75958 187.526C6.63802 141.542 45.9184 106 93.5 106C141.082 106 180.362 141.542 186.24 187.526Z" fill="#6C6C6C"/>
			</svg>
			<ExampleText/>
		</ExampleWrapper>
	);
}