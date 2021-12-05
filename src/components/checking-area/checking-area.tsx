import { FC, memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import { WordCard } from '../word-card/word-card';
import { CardType } from '../../dnd-types/item-types';
import {getBaseCards, getCheckCards} from '../../store/selector';
import {moveWordInsideCheckArea, addWordToCheckArea} from '../../store/actions';
import {findCard, SingleWord} from '../../utils';
import line from '../../svg/line.svg';

const CheckingContainer = styled.div`
	width: 100%;
	min-height: 100px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 0;
	position: relative;
	padding: 40px 0;
`;

const LineWrapper = styled.div<{topPosition: string}>`
	position: absolute;
	top: ${(props) => props.topPosition};
	left: 0;
`;

const linesPositions: string[] = ['15px', '65px', '115px'];

export const CheckingArea: FC = memo(function CheckingArea() {
	const baseCards = useSelector(getBaseCards);
	const checkCards = useSelector(getCheckCards);

	const dispatch = useDispatch();

	const addWordToCheckAreaAction = (card: SingleWord): void => {
		dispatch(addWordToCheckArea(card));
	};

	const moveWordInsideCheckAreaAction = useCallback((card: SingleWord | undefined, newIndex: number) => {
		dispatch(moveWordInsideCheckArea(card, newIndex));
	},[dispatch])

	const findOriginCard = (id: number): {originCard: SingleWord, index: number} => {
		const originCard = baseCards.filter((it: SingleWord) => it.id === id)[0]
		return {
			originCard,
			index: baseCards.indexOf(originCard),
		}
	}

	const findCheckCard = useCallback((id: number)=> findCard(id, checkCards), [checkCards]);

	const moveCard = useCallback((id: number, atIndex: number): void => {
			const {card} = findCheckCard(id);

			if (card) {
				moveWordInsideCheckAreaAction(card, atIndex);
			}
		},
		[findCheckCard, moveWordInsideCheckAreaAction],
	)

	const [, drop] = useDrop(() => ({ 
		accept: CardType.WORD ,
		drop(item: SingleWord) {
			const {card} = findCheckCard(item.id);
			if (!card) {
				const {originCard} = findOriginCard(item.id);
				addWordToCheckAreaAction(originCard);
			}
			return undefined
		}
	}),
	[checkCards]);

	return (
		<CheckingContainer ref={drop}>
			{linesPositions.map((it, ind) => (
				<LineWrapper topPosition = {it} key = {ind} /*lines are static*/> 
				<img src={line} width="478" height="2" alt="word-line" />
			</LineWrapper>
			))}
			{checkCards.map((card: SingleWord) => (
				<WordCard
					key={card.id}
					id={card.id}
					text={card.text}
					moveCard={moveCard}
					findCard={findCheckCard}
				/>
			))}
		</CheckingContainer>
	)
})