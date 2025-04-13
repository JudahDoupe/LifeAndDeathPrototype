import React from 'react';
import { CardData } from '../../cards';
import PlayableCard from './PlayableCard';

interface HandProps {
  cards: CardData[];
  onPlayCard: (card: CardData) => void;
}

const Hand: React.FC<HandProps> = ({ cards, onPlayCard }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <PlayableCard
          key={`${card.name}-${index}`}
          card={card}
          onPlay={() => onPlayCard(card)}
        />
      ))}
    </div>
  );
};

export default Hand;