
export interface SingleWord {
  readonly id: number,
	readonly text: string,
}

export interface WordsState {
	baseCards: SingleWord[], 
	sourceCards: SingleWord[] | [], 
	checkCards: SingleWord[] | [], 
	originText: {correctAnswerKey: number, text: string}
}

export const findCard = (id: number, cards: SingleWord[]): {card: SingleWord | undefined, index: number} => {
	const card: SingleWord | undefined = cards.find((it: SingleWord | undefined) => it?.id === id);
	const index: number = card ? cards.indexOf(card) : -1;
	return {card, index}
}