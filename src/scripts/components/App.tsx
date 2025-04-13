import React from 'react';
import Board from './board/Board';
import Hand from './ui/Hand';
import Decks from './ui/Decks';
import { useGame } from '../hooks/useGame';

const App: React.FC = () => {
  const { gameState, playCard } = useGame();

  return (
    <div className="game-container">
      <div className="game-layout">
        <div className="game-row board-row">
          <Board board={gameState.board} />
        </div>
        <div className="game-row decks-row">
          <Decks decks={gameState.decks} />
        </div>
        <div className="game-row hand-row">
          <Hand 
            cards={gameState.hand}
            onPlayCard={playCard}
          />
        </div>
      </div>
    </div>
  );
};

export default App;