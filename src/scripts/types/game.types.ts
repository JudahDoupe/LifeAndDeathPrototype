import { LifeCard, DeathCard, CardData } from '../cards';

export enum DeckType {
    LIFE = 'life',
    DEATH = 'death'
}

/** Game-specific constants */
export const Constants = {
    LIFE_DECK: DeckType.LIFE,
    DEATH_DECK: DeckType.DEATH
} as const;

/** The complete game state */
export interface GameState {
    board: Array<Array<CardData>>;
    hand: Array<CardData>;
    decks: {
        life: LifeCard[];
        death: DeathCard[];
    };
}