import { LifeCard, DeathCard, CardData } from '../cards';

export enum DeckType {
    LIFE = 'life',
    DEATH = 'death'
}

/** Game-specific constants */
export const Constants = {
    LIFE_DECK: DeckType.LIFE,
    DEATH_DECK: DeckType.DEATH,
    INITIAL_PH: 7.0, // Neutral pH
    MIN_PH: 0,
    MAX_PH: 14
} as const;

/** The complete game state */
export interface GameState {
    board: Array<Array<CardData>>;
    hand: Array<CardData>;
    decks: {
        life: LifeCard[];
        death: DeathCard[];
    };
    chosenCard: CardData | null;
    boardPh: number; // Track the board's pH level
}