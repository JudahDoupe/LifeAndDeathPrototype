import React from 'react';
import { CardData, ALLCARDS } from '../../cards';

interface PlayableCardProps {
  card: CardData;
  onPlay: () => void;
  isPlayable?: boolean;
  isChosen?: boolean;
}

const PlayableCard: React.FC<PlayableCardProps> = ({ 
  card, 
  onPlay, 
  isPlayable = true,
  isChosen = false 
}) => {
  const getPhInfo = () => {
    if (card.deck === 'life') {
      const lifeCard = ALLCARDS.life.find(c => c.name === card.name);
      if (lifeCard) {
        return `pH ${lifeCard.phRange.min}-${lifeCard.phRange.max}`;
      }
    } else if (card.deck === 'death') {
      const deathCard = ALLCARDS.death.find(c => c.name === card.name);
      if (deathCard) {
        const sign = deathCard.phChange >= 0 ? '+' : '';
        return `pH ${sign}${deathCard.phChange}`;
      }
    }
    return '';
  };

  return (
    <div
      className={`card ${!isPlayable ? 'disabled' : ''} ${isChosen ? 'chosen' : ''}`}
      onClick={!isPlayable ? undefined : onPlay}
      data-deck={card.deck}
    >
      <div className="card-content">
        <div className="card-name">{card.name}</div>
        <div className="card-ph">{getPhInfo()}</div>
      </div>
    </div>
  );
};

export default PlayableCard;