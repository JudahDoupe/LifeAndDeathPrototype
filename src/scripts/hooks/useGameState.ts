import { useState, useEffect } from 'react';
import { CARDS } from '../cards';
import { GameState } from '../types/game.types';
import { shuffleArray } from '../utils/array';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    hand: [],
    decks: {
      life: [...CARDS.life],
      death: [...CARDS.death]
    }
  });

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledLife = shuffleArray([...CARDS.life]);
    setGameState({
      board: Array(12).fill([]),
      hand: [
        { name: shuffledLife[0].name, deck: 'life' },
        { name: shuffledLife[1].name, deck: 'life' },
        { name: shuffledLife[2].name, deck: 'life' }
      ],
      decks: {
        life: shuffledLife.slice(3),
        death: [...CARDS.death]
      }
    });
  };

  return {
    gameState,
    setGameState
  };
}