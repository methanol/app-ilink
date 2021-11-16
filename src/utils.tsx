
export interface SingleWord {
  readonly id: number,
	readonly text: string,
}

export const findCard = (id: number, cards: []): {card: SingleWord | undefined, index: number} => {
	const card = cards.find((it: SingleWord) => it.id === id);
	const index = card ? cards.indexOf(card) : -1;
	return {card, index}
}