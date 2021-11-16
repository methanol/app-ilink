import { FC, memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import { WordCard } from '../word-card/word-card';
import { CardType } from '../../dnd-types/item-types';
import {getSourceCards, getBaseCards} from '../../store/selector';
import {moveWordInsideSourceArea, addWordToSourceArea} from '../../store/actions';
import {findCard, SingleWord} from '../../utils';

const SourceContainer = styled.div`
	width: 95%;
	min-height: 125px;
	padding: 10px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 70px;
	box-sizing: border-box;
	border: 2px solid #4B4B4B;
	border-radius: 15px;
`;

export const SourceArea: FC = memo(function SourceArea() {
	const sourceCards = useSelector(getSourceCards);
	const baseCards = useSelector(getBaseCards);

	const dispatch = useDispatch();
	const moveWordInsideSourceAreaAction = useCallback((card: SingleWord | undefined, newIndex: number) => {
		dispatch(moveWordInsideSourceArea(card, newIndex));
	},[dispatch])

	const addWordToSourceAreaAction = (card: SingleWord) => {
		dispatch(addWordToSourceArea(card));
	};

	const findSourceCard = useCallback((id) => findCard(id, sourceCards),[sourceCards]);

	const findOriginCard = (id: number) => {
		const originCard = baseCards.filter((it: SingleWord) => it.id === id)[0]
		return {
			originCard,
			index: baseCards.indexOf(originCard),
		}
	};

	const moveCard = useCallback((id: number, atIndex: number) => {
			const {card} = findSourceCard(id);
			
			if (card) {
				moveWordInsideSourceAreaAction(card, atIndex);
			}
		},
		[findSourceCard, moveWordInsideSourceAreaAction],
	)

	const [, drop] = useDrop(() => ({ 
		accept: CardType.WORD ,
		drop(item: SingleWord) {
			const {card} = findSourceCard(item.id);
			if (!card) {
				const {originCard} = findOriginCard(item.id);
				addWordToSourceAreaAction(originCard);
			}
			return undefined
		}
	}),
	[sourceCards]);

	return (
		<SourceContainer ref={drop}>
			{sourceCards.map((card: SingleWord) => (
				<WordCard
					key={card.id}
					id={card.id}
					text={card.text}
					moveCard={moveCard}
					findCard={findSourceCard}
				/>
			))}
		</SourceContainer>
	)
})