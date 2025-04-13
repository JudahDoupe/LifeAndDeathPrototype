import React from 'react';
import { CardData } from '../../cards';
import PlayedCard from './PlayedCard';

interface CardStackProps {
  cards: CardData[];
}

const CardStack: React.FC<CardStackProps> = ({ cards }) => {
  return (
    <div className="card-stack">
      {cards.map((card, index) => (
        <PlayedCard
          key={`${card.name}-${index}`}
          card={card}
          stackIndex={index}
        />
      ))}
    </div>
  );
};

export default CardStack;