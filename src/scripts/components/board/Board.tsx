import React from 'react';
import { CardData } from '../../cards';
import CardStack from './CardStack';

interface BoardProps {
  board: Array<Array<CardData>>;
  chosenCard?: CardData | null;
  onStackClick?: (stackIndex: number) => void;
  boardPh: number;
}

const Board: React.FC<BoardProps> = ({ 
  board, 
  chosenCard,
  onStackClick,
  boardPh
}) => {
  return (
    <div className="board-area">
      <div className="ph-meter">
        Water pH: {boardPh.toFixed(1)}
      </div>
      <div className="board-container">
        {board.map((stack, stackIndex) => (
          <div key={stackIndex} className="stack-container">
            <CardStack 
              stackIndex={stackIndex}
              stackedCards={stack} 
              chosenCard={chosenCard}
              onStackClick={onStackClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;