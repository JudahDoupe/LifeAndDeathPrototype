import { DeathCard } from '../cards';
import { GameState } from '../types/game.types';

export function useDeathCards() {
  const playDeathCard = (
    card: DeathCard,
    gameState: GameState,
    onStateChange: (newState: GameState) => void,
    onCardPlayed: () => void
  ): void => {
    onStateChange({
      ...gameState,
      board: gameState.board.map(stack => {
        if (stack.length === 0) return stack;
        const topCard = stack[stack.length - 1];
        return card.removes.includes(topCard.name) 
          ? stack.slice(0, -1)  // Remove only the top card if it matches
          : stack;              // Keep stack unchanged if top card doesn't match
      }),
      hand: gameState.hand.filter(c => c.name !== card.name)
    });

    onCardPlayed();
  };

  return {
    playDeathCard
  };
}