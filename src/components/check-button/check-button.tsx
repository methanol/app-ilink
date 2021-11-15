import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import {getOriginText, createUserKeySelector} from '../../store/selector';

const ButtonWrapper = styled.div`
	width: 100%;
	margin-bottom: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

const Button = styled.button`
	width: 470px;
	height: 68px;
	font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 21px;
	text-align: center;
	color: #000000;
	border-radius: 88px;
	border: 1px solid #C9C9C9;
	box-sizing: border-box;
	background: linear-gradient(91.2deg, #FFFFFF 0%, #F2F2F2 100%);
	box-shadow: -2px -4px 8px #FFFFFF, 2px 4px 8px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	opacity: 1;

	&:active {
		background: linear-gradient(91.2deg, #FFFFFF 0%, #F2F2F2 100%);
		box-shadow: inset -2px -4px 12px #FFFFFF, inset 2px 4px 8px rgba(0, 0, 0, 0.2);
	}

	&:disabled {
		opacity: 0.5;
		cursor: auto;
  }
`;

const ErrorMessage = styled.div<{opacity: string}>`
	position: absolute;
	top: -50px;
	font-style: normal;
	font-weight: normal;
	font-size: 24px;
	line-height: 28px;
	margin-bottom: 27px;
	color: #FF0000;
	opacity: ${(props) => props.opacity};
	text-shadow: -1px -2px 2px #FFFFFF, 1px 2px 2px rgba(91, 13, 13, 0.5);
`;

const CorrectMessage = styled.div<{opacity: string}>`
	position: absolute;
	top: -50px;
	font-style: normal;
	font-weight: normal;
	font-size: 24px;
	line-height: 28px;
	margin-bottom: 27px;
	color: green;
	opacity: ${(props) => props.opacity};
	text-shadow: -1px -2px 2px #FFFFFF, 1px 2px 2px rgba(91, 13, 13, 0.5);
`;

export function CheckButton() {
	const originText = useSelector(getOriginText);
	const userKey = useSelector(createUserKeySelector);
	const controlKey = originText.correctAnswerKey;

	const [messageOpacity, setMessageOpacity] = useState({
		errorOpacity: '0',
		correctOpacity: '0',
		speakButtonopacity: '0',
	});

	let messageTimeout: any;

	const validateUserMessage = (controlKey: number, userKey: number): void => {
		if (controlKey === userKey) {
			console.log("correct answer!");
			setMessageOpacity((prevState) => ({
				...prevState,
				correctOpacity: '1',
				errorOpacity: '0',
			}));
			// messageTimeout = setTimeout(() => {
			// 	setMessageOpacity((prevState) => ({
			// 		...prevState,
			// 		errorOpacity: '0',
			// 		correctOpacity: '0',
			// 	}));
			// }, 2500);
		} else {
			console.log("wrong answer!");
			setMessageOpacity((prevState) => ({
				...prevState,
				errorOpacity: '1',
				correctOpacity: '0',
			}));
			messageTimeout = setTimeout(() => {
				setMessageOpacity((prevState) => ({
					...prevState,
					errorOpacity: '0',
					correctOpacity: '0',
				}));
			}, 2000);
		}
	}

	const handleButtonClick = () => {
		clearTimeout(messageTimeout);
		console.log("button clicked!", userKey);
		validateUserMessage(controlKey, userKey);
	}

	return (
		<ButtonWrapper>
			<ErrorMessage opacity = {messageOpacity.errorOpacity}>Something wrong!</ErrorMessage>
			<CorrectMessage opacity = {messageOpacity.correctOpacity}>The answer is correct!</CorrectMessage>
			<Button disabled = {userKey === 0} name="checkButton" onClick = {handleButtonClick}>Check</Button>
		</ButtonWrapper>
	);
}