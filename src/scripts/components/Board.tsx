import React from 'react';
import { PlayedCard } from '../types/game.types';
import CardStack from './CardStack';

interface BoardProps {
  board: Array<Array<PlayedCard>>;
  onPlayCard: (cardName: string, stackIndex: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onPlayCard }) => {
  return (
    <div className="board-container">
      {board.map((stack, index) => (
        <div key={index} className="stack-container">
          <CardStack
            cards={stack}
            onClick={() => {
              const topCard = stack[stack.length - 1];
              if (topCard) {
                onPlayCard(topCard.name, index);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Board;