import React from 'react';
import { CardData } from '../cards';
import CardComponent from './Card';

interface CardStackProps {
  cards: CardData[];
}

const CardStack: React.FC<CardStackProps> = ({ cards }) => {
  const cardStackPxOffset = 5;

  return (
    <div className="card-stack">
      {cards.map((card, index) => (
        <CardComponent
          key={`${card.name}-${index}`}
          card={card}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translateY(-${index * cardStackPxOffset}px)`,
            zIndex: index
          }}
        />
      ))}
    </div>
  );
};

export default CardStack;