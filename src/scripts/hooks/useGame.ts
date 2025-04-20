import { DeckType } from '../types/game.types';
import { useGameState } from './useGameState';
import { useLifeCards } from './useLifeCards';
import { useDeathCards } from './useDeathCards';
import { shuffleArray } from '../utils/array';
import { ALLCARDS, CardData } from '../cards';

export function useGame() {
  const { gameState, setGameState } = useGameState();
  const { playLifeCard } = useLifeCards();
  const { playDeathCard } = useDeathCards();

  const selectCard = (card: CardData) => {
    setGameState(prev => ({
      ...prev,
      chosenCard: prev.chosenCard?.id === card.id ? null : card
    }));
  };

  const playCard = (stackIndex?: number) => {
    if (!gameState.chosenCard) return;

    if (gameState.chosenCard.deck === DeckType.LIFE && stackIndex !== undefined) {
      playLifeCard(
        gameState.chosenCard.name,
        stackIndex,
        gameState,
        (newState) => setGameState({ ...newState, chosenCard: null }),
        () => drawCard(DeckType.DEATH)
      );
    } else if (gameState.chosenCard.deck === DeckType.DEATH) {
      const deathCard = ALLCARDS.death.find(c => c.name === gameState.chosenCard?.name);
      if (!deathCard) return;
      
      playDeathCard(
        deathCard,
        gameState,
        (newState) => setGameState({ ...newState, chosenCard: null }),
        () => drawCard(DeckType.LIFE)
      );
    }
  };

  const drawCard = (deck: DeckType) => {
    if (!gameState?.decks?.[deck]) return;
    
    const currentDeck = [...gameState.decks[deck]];
    if (currentDeck.length === 0) return;

    const shuffledDeck = shuffleArray(currentDeck);
    const drawnCard = shuffledDeck[0];
    if (!drawnCard) return;

    setGameState(prev => ({
      ...prev,
      hand: [...prev.hand, { 
        name: drawnCard.name, 
        deck,
        id: `${drawnCard.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }],
      decks: {
        ...prev.decks,
        [deck]: shuffleArray(prev.decks[deck].filter(card => card.name !== drawnCard.name))
      }
    }));
  };

  return {
    gameState,
    selectCard,
    playCard
  };
}