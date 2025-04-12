import React from 'react';
import { DeckType } from '../types/game.types';

interface CardProps {
  name: string;
  deck: DeckType;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  name, 
  deck, 
  onClick, 
  disabled = false,
  className = ''
}) => {
  return (
    <div
      className={`card ${disabled ? 'disabled' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      data-deck={deck}
    >
      {name}
    </div>
  );
};

export default Card;