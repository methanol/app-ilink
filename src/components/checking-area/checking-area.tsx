import { FC, memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import { WordCard } from '../word-card/word-card';
import { CardType } from '../../dnd-types/item-types';
import {getBaseCards, getCheckCards} from '../../store/selector';
import {moveWordInsideCheckArea, addWordToCheckArea} from '../../store/actions';
import {findCard, SingleWord} from '../../utils';

const CheckingContainer = styled.div`
	width: 100%;
	min-height: 100px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 40px;
	position: relative
`;

const LineWrapper = styled.div<{topPosition: string}>`
	position: absolute;
	top: ${(props) => props.topPosition};
	left: 0;
`;

const linesPositions: string[] = ['-25px', '25px', '75px'];

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
				<svg width="478" height="2" viewBox="0 0 478 2" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 1H483" stroke="#4B4B4B" strokeLinecap="round"/>
				</svg>
			</LineWrapper>
			))}
			{checkCards.map((card: any) => (
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