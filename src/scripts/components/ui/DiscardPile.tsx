import React from 'react';
import { DeckType } from '../../types/game.types';

interface DiscardPileProps {
  isActive: boolean;
  onDiscard: () => void;
}

const DiscardPile: React.FC<DiscardPileProps> = ({ isActive, onDiscard }) => {
  return (
    <div 
      className={`card-stack discard-pile ${isActive ? 'active' : ''}`}
      onClick={isActive ? onDiscard : undefined}
      data-deck={DeckType.DEATH}
    >
      Play
    </div>
  );
};

export default DiscardPile;