import { DeathCard, ALLCARDS } from '../cards';
import { GameState, Constants } from '../types/game.types';

export function useDeathCards() {
  const playDeathCard = (
    card: DeathCard,
    gameState: GameState,
    onStateChange: (newState: GameState) => void,
    onCardPlayed: () => void
  ): void => {
    const chosenCard = gameState.chosenCard;
    if (!chosenCard) return;

    const newPh = Math.max(
      Constants.MIN_PH,
      Math.min(Constants.MAX_PH, gameState.boardPh + card.phChange)
    );

    const updatedBoard = gameState.board.map(stack => {
      if (stack.length === 0) 
        return stack;
      
      const topCard = ALLCARDS.life.find(c => c.name === stack[stack.length - 1].name);
      if (!topCard) 
        return stack;
      
      // Check if pH is outside the card's tolerance range
      if (newPh < topCard.phRange.min || newPh > topCard.phRange.max)
        return stack.slice(0, -1);

      return stack;
    });

    onStateChange({
      ...gameState,
      boardPh: newPh,
      board: updatedBoard,
      hand: gameState.hand.filter(c => c.id !== chosenCard.id),
      chosenCard: null
    });

    onCardPlayed();
  };

  return {
    playDeathCard
  };
}