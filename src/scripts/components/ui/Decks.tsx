import React from 'react';
import { LifeCard, DeathCard } from '../../cards';

interface DecksProps {
  decks: {
    life: LifeCard[];
    death: DeathCard[];
  };
  children?: React.ReactNode;
}

const Decks: React.FC<DecksProps> = ({ decks, children }) => {
  return (
    <div id="decks">
      <div id="life-deck" className="deck-card" data-deck="life">
        <span id="life-deck-count">{decks.life.length}</span>
      </div>
      {children}
      <div id="death-deck" className="deck-card" data-deck="death">
        <span id="death-deck-count">{decks.death.length}</span>
      </div>
    </div>
  );
};

export default Decks;