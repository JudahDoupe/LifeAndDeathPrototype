import React from 'react';
import { CardData } from '../cards';
import Card from './Card';

interface HandProps {
  cards: CardData[];
  onPlayCard: (card: CardData) => void;
}

const Hand: React.FC<HandProps> = ({ cards, onPlayCard }) => {
  return (
    <div id="hand">
      {cards.map((card, index) => (
        <Card
          key={`${card.name}-${index}`}
          card={card}
          onClick={() => onPlayCard(card)}
        />
      ))}
    </div>
  );
};

export default Hand;