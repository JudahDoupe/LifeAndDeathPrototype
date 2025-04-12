import { LifeCard, DeathCard } from '../cards';

/** The type of deck a card belongs to */
export type DeckType = 'life' | 'death';

/** Game-specific constants */
export const Constants = {
    LIFE_DECK: 'life' as DeckType,
    DEATH_DECK: 'death' as DeckType
} as const;

/** Represents a card in play */
export interface PlayedCard {
    name: string;
    deck: DeckType;
}

/** The complete game state */
export interface GameState {
    board: Array<Array<PlayedCard>>;
    hand: Array<PlayedCard>;
    decks: {
        life: LifeCard[];
        death: DeathCard[];
    };
}