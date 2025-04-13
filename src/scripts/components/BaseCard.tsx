import React from 'react';
import { CardData } from '../cards';

interface BaseCardProps {
  card: CardData;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const BaseCard: React.FC<BaseCardProps> = ({ 
  card,
  onClick, 
  disabled = false,
  style = {},
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

export default BaseCard;