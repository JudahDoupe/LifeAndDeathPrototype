import { DeckType } from '../types/game.types';
import { useGameState } from './useGameState';
import { useLifeCards } from './useLifeCards';
import { useDeathCards } from './useDeathCards';
import { shuffleArray } from '../utils/array';

export function useGame() {
  const { gameState, setGameState } = useGameState();
  const { playLifeCard } = useLifeCards();
  const { playDeathCard } = useDeathCards();

  const drawCard = (deck: DeckType) => {
    const currentDeck = [...gameState.decks[deck]];
    if (currentDeck.length === 0) return;

    const drawnCard = shuffleArray(currentDeck)[0];
    setGameState(prev => ({
      ...prev,
      hand: [...prev.hand, { name: drawnCard.name, deck }],
      decks: {
        ...prev.decks,
        [deck]: prev.decks[deck].filter(card => card.name !== drawnCard.name)
      }
    }));
  };

  const playCard = (cardName: string, cardDeck: DeckType, stackIndex?: number) => {
    if (cardDeck === 'life' && stackIndex !== undefined) {
      playLifeCard(
        cardName,
        stackIndex,
        gameState,
        setGameState,
        () => drawCard('death')
      );
    } else if (cardDeck === 'death') {
      playDeathCard(
        cardName,
        gameState,
        setGameState,
        () => drawCard('life')
      );
    }
  };

  return {
    gameState,
    playCard
  };
}