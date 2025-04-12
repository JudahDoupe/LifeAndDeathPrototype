import { CARDS } from '../cards';
import { GameState } from '../types/game.types';

export function useDeathCards() {
  const playDeathCard = (
    cardName: string,
    gameState: GameState,
    onStateChange: (newState: GameState) => void,
    onCardPlayed: () => void
  ): void => {
    const deathCard = CARDS.death.find(c => c.name === cardName);
    if (!deathCard) return;

    onStateChange({
      ...gameState,
      board: gameState.board.map(stack => 
        stack.filter(card => !deathCard.removes.includes(card.name))
      ),
      hand: gameState.hand.filter(card => card.name !== cardName)
    });

    onCardPlayed();
  };

  return {
    playDeathCard
  };
}