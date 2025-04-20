import { useState, useEffect } from 'react';
import { ALLCARDS } from '../cards';
import { GameState, Constants } from '../types/game.types';
import { shuffleArray } from '../utils/array';

const duplicateCardWithNewId = (card: any) => ({
  ...card,
  id: Math.random().toString(36).substr(2, 9)
});

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    hand: [],
    decks: {
      life: [],
      death: []
    },
    chosenCard: null,
    boardPh: Constants.INITIAL_PH
  });

  useEffect(() => {
    initializeGame();
  }, []);

  const drawInitialCards = (state: GameState): GameState => {
    // Draw 3 life cards and 2 death cards
    const lifeCards = state.decks.life.slice(0, 3);
    const deathCards = state.decks.death.slice(0, 2);
    
    return {
      ...state,
      hand: [...lifeCards, ...deathCards].map(duplicateCardWithNewId),
      decks: {
        life: state.decks.life.slice(3),
        death: state.decks.death.slice(2)
      }
    };
  };

  const initializeGame = () => {
    // Create initial state with shuffled decks
    const initialState: GameState = {
      board: Array(9).fill([]),
      hand: [],
      decks: {
        life: shuffleArray(ALLCARDS.life).map(duplicateCardWithNewId),
        death: shuffleArray(ALLCARDS.death).map(duplicateCardWithNewId)
      },
      chosenCard: null,
      boardPh: Constants.INITIAL_PH
    };

    // Draw initial cards and set state
    const stateWithCards = drawInitialCards(initialState);
    setGameState(stateWithCards);
  };

  return {
    gameState,
    setGameState
  };
}