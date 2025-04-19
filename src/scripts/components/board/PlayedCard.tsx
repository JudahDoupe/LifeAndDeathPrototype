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
  return (
    <div
      className="card"
      data-deck={card.deck}
      style={{
        zIndex: indexInStack
      }}
    >
      {card.name}
    </div>
  );
};

export default PlayedCard;