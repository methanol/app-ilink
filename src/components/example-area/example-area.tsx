import React from 'react';
import styled from 'styled-components';

import {ExampleText} from './example-text';
import person from '../../svg/person.svg';

const ExampleWrapper = styled.div`
	width: 100%;
	margin-bottom: 10px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

export default function ExampleArea() {
	return (
		<ExampleWrapper>
			<img src={person} width="187" height="200" alt="person" />
			<ExampleText/>
		</ExampleWrapper>
	);
}