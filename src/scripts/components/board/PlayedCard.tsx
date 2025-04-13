import React from 'react';
import { CardData } from '../../cards';

interface PlayedCardProps {
  card: CardData;
  indexInStack: number;
}

const PlayedCard: React.FC<PlayedCardProps> = ({ 
  card, 
  indexInStack
}) => {
  const stackOffset = 5; 
  return (
    <div
      className="card"
      data-deck={card.deck}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translateY(${indexInStack * stackOffset}px)`,
        zIndex: indexInStack
      }}
    >
      {card.name}
    </div>
  );
};

export default PlayedCard;