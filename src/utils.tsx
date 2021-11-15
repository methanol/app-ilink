
export interface SingleWord {
  id: number,
	text: string,
}

export const findCard = (id: number, cards: []) => {
		const card: SingleWord | undefined = cards.find((it: SingleWord) => it.id === id);
		const index = card ? cards.indexOf(card) : -1;
		return {card, index}
	}