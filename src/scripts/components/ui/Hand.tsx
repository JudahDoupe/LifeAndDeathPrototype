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
      {cards.map((card) => (
        <PlayableCard
          key={card.id}
          card={card}
          onPlay={() => onCardSelect(card)}
          isChosen={chosenCard?.id === card.id}
        />
      ))}
    </div>
  );
};

export default Hand;