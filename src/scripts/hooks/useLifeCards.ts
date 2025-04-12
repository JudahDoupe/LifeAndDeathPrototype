import { CARDS } from '../cards';
import { GameState, PlayedCard } from '../types/game.types';

export function useLifeCards() {
  const canPlayLifeCard = (cardName: string, stackIndex: number, board: Array<Array<PlayedCard>>): boolean => {
    const stack = board[stackIndex];
    const card = CARDS.life.find(c => c.name === cardName);
    
    if (!card) return false;
    if (stack.length === 0) return card.requirements.length === 0;
    
    const topCard = stack[stack.length - 1];
    return card.requirements.includes(topCard.name);
  };

  const playLifeCard = (
    cardName: string, 
    stackIndex: number, 
    gameState: GameState, 
    onStateChange: (newState: GameState) => void,
    onCardPlayed: () => void
  ): void => {
    if (!canPlayLifeCard(cardName, stackIndex, gameState.board)) return;

    onStateChange({
      ...gameState,
      board: gameState.board.map((stack, idx) => 
        idx === stackIndex 
          ? [...stack, { name: cardName, deck: 'life' }]
          : stack
      ),
      hand: gameState.hand.filter(card => card.name !== cardName)
    });

    onCardPlayed();
  };

  return {
    canPlayLifeCard,
    playLifeCard
  };
}