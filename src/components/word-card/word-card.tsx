import { FC, memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from 'styled-components';

import { CardType } from "../../dnd-types/item-types";

const WordContainer = styled.div`
	padding: 5px 18px;
	margin-bottom: 15px;
	margin-right: 10px;
	cursor: move;
	display: block;
	font-size: 18px;
	line-height: 21px;
	font-weight: normal;
	color: #000000;
	border: 1px solid #C9C9C9;
	margin-right: 10px;
	height: 30px;
	box-sizing: border-box;
	background: #FFFFFF;
	box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
	border-radius: 13px;
`;

export interface CardProps {
	id: number;
	text: string;
	moveCard: (id: number, to: number) => void;
	findCard: (id: number) => { index: number };
}

interface Item {
	id: number;
	originalIndex: number;
}

export const WordCard: FC<CardProps> = memo(function Card({id, text, moveCard, findCard}) {
	const originalIndex = findCard(id).index;
	const [{ opacity }, drag] = useDrag(
		() => ({
			type: CardType.WORD,
			item: { id, originalIndex },
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0 : 1
			}),
			end: (item, monitor) => {
				const { id: droppedId, originalIndex } = item;
				const didDrop = monitor.didDrop();
				if (!didDrop) {
					moveCard(droppedId, originalIndex);
				}
			}
		}),
		[id, originalIndex, moveCard]
	);

	const [, drop] = useDrop(
		() => ({
			accept: CardType.WORD,
			canDrop: () => false,
			hover({ id: draggedId }: Item) {
				if (draggedId !== id) {
					const { index: overIndex } = findCard(id);
					moveCard(draggedId, overIndex);
					
				}
			}
		}),
		[findCard, moveCard]
	);

	return (
		<WordContainer ref={(node) => drag(drop(node))} style = {{opacity}}>
			{text}
		</WordContainer>
	);
});