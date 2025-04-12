import React from 'react';
import { CardData } from '../cards';
import CardStack from './CardStack';

interface BoardProps {
  board: Array<Array<CardData>>;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="board-container">
      {board.map((stack, index) => (
        <div key={index} className="stack-container">
          <CardStack cards={stack} />
        </div>
      ))}
    </div>
  );
};

export default Board;