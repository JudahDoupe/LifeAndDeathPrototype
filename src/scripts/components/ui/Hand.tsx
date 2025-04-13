import React from 'react';
import { CardData } from '../../cards';
import PlayableCard from './PlayableCard';

interface HandProps {
  cards: CardData[];
  onCardSelect: (card: CardData) => void;
  chosenCard: CardData | null;
}

const Hand: React.FC<HandProps> = ({ cards, onCardSelect, chosenCard }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <PlayableCard
          key={`${card.name}-${index}`}
          card={card}
          onPlay={() => onCardSelect(card)}
          isChosen={chosenCard?.name === card.name}
        />
      ))}
    </div>
  );
};

export default Hand;