import { ALLCARDS } from '../cards';
import { CardData } from '../cards';
import { GameState } from '../types/game.types';

export function useLifeCards() {
  const canPlayLifeCard = (cardName: string, stackIndex: number, board: Array<Array<CardData>>): boolean => {
    const stack = board[stackIndex];
    const card = ALLCARDS.life.find(c => c.name === cardName);
    
    if (!card) return false;
    if (stack.length === 0) return card.requirements.length === 0;
    
    const topCard = stack[stack.length - 1];
    // Check if the top card matches any of the requirements
    return card.requirements.length === 0 || card.requirements.some(req => req === topCard.name);
  };

  const playLifeCard = (
    cardName: string, 
    stackIndex: number, 
    gameState: GameState, 
    onStateChange: (newState: GameState) => void,
    onCardPlayed: () => void
  ): void => {
    if (!canPlayLifeCard(cardName, stackIndex, gameState.board)) return;

    const chosenCard = gameState.chosenCard;
    if (!chosenCard) return;

    onStateChange({
      ...gameState,
      board: gameState.board.map((stack, idx) => 
        idx === stackIndex 
          ? [...stack, chosenCard]
          : stack
      ),
      hand: gameState.hand.filter(card => card.id !== chosenCard.id),
      chosenCard: null
    });

    onCardPlayed();
  };

  return {
    canPlayLifeCard,
    playLifeCard
  };
}