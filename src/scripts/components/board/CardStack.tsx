import React from 'react';
import { CardData, LifeCard } from '../../cards';
import PlayedCard from './PlayedCard';

interface CardStackProps {
  stackIndex: number;
  stackedCards?: CardData[];
  chosenCard?: CardData | null;
  onStackClick?: (stackIndex: number) => void;
}

const CardStack: React.FC<CardStackProps> = ({ 
  stackIndex, 
  stackedCards = [],
  chosenCard = null,
  onStackClick,
}) => {
  const topCard = React.useMemo(() => 
    stackedCards && stackedCards.length > 0 ? stackedCards[stackedCards.length - 1] : null
  , [stackedCards]);

  const isPlayable = React.useMemo(() => {
    if (!chosenCard) return false;
    const lifeCard = chosenCard as LifeCard;
    if (!topCard) return lifeCard.requirements?.length === 0;
    return lifeCard.requirements?.some(requiredCard => 
      requiredCard.toLowerCase() === topCard.name.toLowerCase()
    ) || false;
  }, [chosenCard, topCard]);

  return (
    <div 
      className={`card-stack ${isPlayable ? 'playable' : ''}`}
      onClick={isPlayable && onStackClick ? () => onStackClick(stackIndex) : undefined}
    >
      {stackedCards?.map((card, cardIndex) => (
        <PlayedCard
          key={`${card.name}-${cardIndex}`}
          card={card}
          indexInStack={cardIndex}
        />
      ))}
    </div>
  );
};

export default CardStack;