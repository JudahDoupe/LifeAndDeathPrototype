import React from 'react';
import { DeckType, PlayedCard } from '../types/game.types';
import Card from './Card';

interface HandProps {
  cards: PlayedCard[];
  onPlayCard: (cardName: string, deck: DeckType) => void;
}

const Hand: React.FC<HandProps> = ({ cards, onPlayCard }) => {
  return (
    <div id="hand">
      {cards.map((card, index) => (
        <Card
          key={`${card.name}-${index}`}
          name={card.name}
          deck={card.deck}
          onClick={() => onPlayCard(card.name, card.deck)}
        />
      ))}
    </div>
  );
};

export default Hand;