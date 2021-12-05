import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import {getOriginText} from '../../store/selector';
import phraseOutline from '../../svg/phrase-outline.svg';

const ExampleTextWrapper = styled.div`
	position: relative;
	max-width: 50%;
`;

const OriginText = styled.div`
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 21px;
	color: #000000;
	margin-left: 10px;
	margin-top: 10px;
	text-decoration: underline dotted;
`;

const TextCloud = styled.div`
	position: absolute;
	top: 0;
	left: -25px;
`;

export function ExampleText() {
	const originText = useSelector(getOriginText);

	return (
		<ExampleTextWrapper>
			<OriginText>{originText.text}</OriginText>
			<TextCloud>
				<img src={phraseOutline} width="307" height="92" alt="outline" />
			</TextCloud>
		</ExampleTextWrapper>
	);
}