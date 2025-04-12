import React from 'react';
import { CardData as CardData } from '../cards';

interface CardProps {
  card: CardData;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ 
  card,
  onClick, 
  disabled = false,
  style
}) => {
  return (
    <div
      className={`card ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      data-deck={card.deck}
      style={style}
    >
      {card.name}
    </div>
  );
};

export default Card;