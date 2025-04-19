import React from 'react';
import { CardData, ALLCARDS } from '../../cards';
import PlayedCard from './PlayedCard';

const getLifeCardRequirements = (card: CardData | null): string[] => {
  if (!card || card.deck !== 'life') return [];
  return ALLCARDS.life.find(c => c.name === card.name)?.requirements || [];
};

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
  const topCard = React.useMemo(() => {
    if (!stackedCards || stackedCards.length === 0) return null;
    return stackedCards[stackedCards.length - 1];
  }, [stackedCards]);

  const isPlayable = React.useMemo(() => {
    if (!chosenCard || chosenCard.deck !== 'life') return false;
    const requirements = getLifeCardRequirements(chosenCard);
    return !topCard ? 
      requirements.length === 0 : 
      requirements.includes(topCard.name);
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