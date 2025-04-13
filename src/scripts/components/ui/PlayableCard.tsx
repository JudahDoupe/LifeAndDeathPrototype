import React from 'react';
import { CardData } from '../../cards';

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

//TODO: disable the card if there are no stacks that the card can be played on

  return (
    <div
      className={`card ${!isPlayable ? 'disabled' : ''} ${isChosen ? 'chosen' : ''}`}
      onClick={!isPlayable ? undefined : onPlay}
      data-deck={card.deck}
    >
      {card.name}
    </div>
  );
};

export default PlayableCard;