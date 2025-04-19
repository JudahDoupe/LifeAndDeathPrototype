import { useState, useEffect } from 'react';
import { ALLCARDS } from '../cards';
import { GameState } from '../types/game.types';
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
    chosenCard: null
  });

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    setGameState({
      board: Array(9).fill([]),
      hand: [
        ...ALLCARDS.life.slice(0, 4).map(duplicateCardWithNewId),
      ],
      decks: {
        life: [
          ...shuffleArray(ALLCARDS.life.slice(0, 6)).map(duplicateCardWithNewId),
          ...shuffleArray(ALLCARDS.life).map(duplicateCardWithNewId),
        ],
        death: [
          ...shuffleArray(ALLCARDS.death.slice(0, 2)).map(duplicateCardWithNewId),
          ...shuffleArray(ALLCARDS.death.slice(0, 6)).map(duplicateCardWithNewId),
          ...shuffleArray(ALLCARDS.death).map(duplicateCardWithNewId),
        ]
      },
      chosenCard: null
    });
  };

  return {
    gameState,
    setGameState
  };
}