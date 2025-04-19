import React from 'react';
import Board from './board/Board';
import Hand from './ui/Hand';
import Decks from './ui/Decks';
import DiscardPile from './ui/DiscardPile';
import { useGame } from '../hooks/useGame';

const App: React.FC = () => {
  const { gameState, selectCard, playCard } = useGame();

  return (
    <div className="game-container">
      <div className="game-layout">
        <div className="game-row board-row">
          <Board 
            board={gameState.board}
            chosenCard={gameState.chosenCard}
            onStackClick={(stackIndex) => playCard(stackIndex)}
          />
        </div>
        <div className="bottom-container">
          <div className="game-row decks-row">
            <Decks decks={gameState.decks}>
              <DiscardPile 
                isActive={gameState.chosenCard?.deck === 'death'}
                onDiscard={() => playCard()}
              />
            </Decks>
          </div>
          <div className="game-row hand-row">
            <Hand 
              cards={gameState.hand}
              onCardSelect={selectCard}
              chosenCard={gameState.chosenCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;