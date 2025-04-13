import React from 'react';
import { CardData } from '../../cards';
import BaseCard from '../BaseCard';

interface PlayableCardProps {
  card: CardData;
  onPlay: () => void;
  disabled?: boolean;
}

const PlayableCard: React.FC<PlayableCardProps> = ({ card, onPlay, disabled }) => {
  return (
    <BaseCard
      card={card}
      onClick={onPlay}
      disabled={disabled}
    />
  );
};

export default PlayableCard;