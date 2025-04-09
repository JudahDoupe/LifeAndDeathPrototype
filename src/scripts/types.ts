export type LifeCard = {
    name: string;
    requirements: string[];
};

export type DeathCard = {
    name: string;
    removes: string[];
};

export type Cards = {
    life: LifeCard[];
    death: DeathCard[];
};

export type DeckType = 'life' | 'death';

// Namespace to avoid global scope pollution
export const Constants = {
    LIFE_DECK: 'life' as DeckType,
    DEATH_DECK: 'death' as DeckType
} as const;