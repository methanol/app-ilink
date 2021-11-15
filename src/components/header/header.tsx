import React from 'react';
import styled from 'styled-components';

interface TitleProps {
	readonly isHighlighted?: boolean;
	}

const Title = styled.h1<TitleProps>`
	font-style: normal;
	font-weight: ${props => props.isHighlighted ? "bold" : "normal"};
	font-size: 36px;
	line-height: 42px;
	color: #252525;
	text-shadow: -2px -4px 3px #FFFFFF, 2px 4px 3px rgba(0, 0, 0, 0.25);
	align-self: flex-start;
	margin-bottom: 56px;
`;

export default function Header(props: { isHighlighted?: boolean | undefined; }) {
	return (
		<Title isHighlighted = {props.isHighlighted}>Translate this sentence</Title>
	);
}