import { useState, useEffect } from 'react';
import { ALLCARDS } from '../cards';
import { GameState, DeckType } from '../types/game.types';
import { shuffleArray } from '../utils/array';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    hand: [],
    decks: {
      life: [...ALLCARDS.life],
      death: [...ALLCARDS.death]
    }
  });

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledLife = shuffleArray([...ALLCARDS.life]);
    setGameState({
      board: Array(12).fill([]),
      hand: [
        { name: shuffledLife[0].name, deck: DeckType.LIFE },
        { name: shuffledLife[1].name, deck: DeckType.LIFE },
        { name: shuffledLife[2].name, deck: DeckType.LIFE }
      ],
      decks: {
        life: shuffledLife.slice(3),
        death: [...ALLCARDS.death]
      }
    });
  };

  return {
    gameState,
    setGameState
  };
}