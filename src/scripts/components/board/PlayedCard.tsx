import React from 'react';
import { CardData } from '../../cards';
import BaseCard from '../BaseCard';

interface BoardCardProps {
  card: CardData;
  stackIndex: number;
  stackOffset?: number;
}

const PlayedCard: React.FC<BoardCardProps> = ({ 
  card, 
  stackIndex, 
  stackOffset = 5 
}) => {
  return (
    <BaseCard
      card={card}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translateY(-${stackIndex * stackOffset}px)`,
        zIndex: stackIndex
      }}
    />
  );
};

export default PlayedCard;