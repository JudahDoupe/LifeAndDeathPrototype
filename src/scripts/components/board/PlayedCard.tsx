import React from 'react';
import { CardData, ALLCARDS } from '../../cards';

interface PlayedCardProps {
  card: CardData;
  indexInStack: number;
}

const PlayedCard: React.FC<PlayedCardProps> = ({ 
  card, 
  indexInStack
}) => {
  const getPhInfo = () => {
    if (card.deck === 'life') {
      const lifeCard = ALLCARDS.life.find(c => c.name === card.name);
      if (lifeCard) {
        return `pH ${lifeCard.phRange.min}-${lifeCard.phRange.max}`;
      }
    }
    return '';
  };

  return (
    <div
      className="card"
      data-deck={card.deck}
      style={{
        zIndex: indexInStack
      }}
    >
      <div className="card-content">
        <div className="card-name">{card.name}</div>
        <div className="card-ph">{getPhInfo()}</div>
      </div>
    </div>
  );
};

export default PlayedCard;