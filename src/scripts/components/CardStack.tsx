import React from 'react';
import { PlayedCard } from '../types/game.types';
import Card from './Card';

interface CardStackProps {
  cards: PlayedCard[];
  onClick?: () => void;
}

const CardStack: React.FC<CardStackProps> = ({ cards, onClick }) => {
  return (
    <div className="card-stack" onClick={onClick}>
      {cards.map((card, index) => (
        <Card
          key={`${card.name}-${index}`}
          name={card.name}
          deck={card.deck}
          className={index !== cards.length - 1 ? 'stacked' : ''}
        />
      ))}
    </div>
  );
};

export default CardStack;