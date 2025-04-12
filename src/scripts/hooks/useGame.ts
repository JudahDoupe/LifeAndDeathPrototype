import { DeckType } from '../types/game.types';
import { useGameState } from './useGameState';
import { useLifeCards } from './useLifeCards';
import { useDeathCards } from './useDeathCards';
import { shuffleArray } from '../utils/array';
import { ALLCARDS, CardData, DeathCard } from '../cards';

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

  const playCard = (card: CardData, stackIndex?: number) => {
    if (card.deck === DeckType.LIFE && stackIndex !== undefined) {
      playLifeCard(
        card.name,
        stackIndex,
        gameState,
        setGameState,
        () => drawCard(DeckType.DEATH)
      );
    } else if (card.deck === DeckType.DEATH) {
      const deathCard = ALLCARDS.death.find((c: DeathCard) => c.name === card.name);
      if (!deathCard) return;
      
      playDeathCard(
        deathCard,
        gameState,
        setGameState,
        () => drawCard(DeckType.LIFE)
      );
    }
  };

  return {
    gameState,
    playCard
  };
}