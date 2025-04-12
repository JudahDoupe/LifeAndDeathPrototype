import { DeckType } from './types/game.types';

export interface CardData {
    name: string;
    deck: DeckType;
}
export interface LifeCard extends CardData {
    requirements: string[];
}
export interface DeathCard extends CardData {
    removes: string[];
}

export type AllCards = {
    life: LifeCard[];
    death: DeathCard[];
};

export const ALLCARDS: AllCards = {
    life: [
        { name: 'Sand', requirements: [], deck: DeckType.LIFE },
        { name: 'Clay', requirements: [], deck: DeckType.LIFE },
        { name: 'Wheat', requirements: ['Sand'], deck: DeckType.LIFE },
        { name: 'Turnips', requirements: ['Sand'], deck: DeckType.LIFE },
        { name: 'Tomatoes', requirements: ['Clay'], deck: DeckType.LIFE },
        { name: 'Pumpkins', requirements: ['Clay'], deck: DeckType.LIFE },
        { name: 'Deer', requirements: ['Wheat'], deck: DeckType.LIFE },
        { name: 'Bear', requirements: ['Pumpkins'], deck: DeckType.LIFE },
        { name: 'Rabbit', requirements: ['Wheat'], deck: DeckType.LIFE },
        { name: 'Butterflies', requirements: ['Tomatoes'], deck: DeckType.LIFE },
    ],
    death: [
        { name: 'Rain', removes: ['Sand'], deck: DeckType.DEATH },   
        { name: 'Sun', removes: ['Clay'], deck: DeckType.DEATH },
        { name: 'Storm', removes: ['Sand', 'Wheat'], deck: DeckType.DEATH },
        { name: 'Snow', removes: ['Clay', 'Pumpkins'], deck: DeckType.DEATH },
        { name: 'Wind', removes: ['Sand', 'Turnips'], deck: DeckType.DEATH },
        { name: 'Frost', removes: ['Clay', 'Tomatoes'], deck: DeckType.DEATH },
        { name: 'Flood', removes: ['Sand', 'Deer', 'Wheat'], deck: DeckType.DEATH },
        { name: 'Blizzard', removes: ['Sand', 'Tomatoes', 'Turnips'], deck: DeckType.DEATH },
        { name: 'Fire', removes: ['Clay', 'Rabbit', 'Wheat', 'Pumpkins', 'Butterflies'], deck: DeckType.DEATH },
        { name: 'Ice', removes: ['Clay', 'Tomatoes', 'Turnips'], deck: DeckType.DEATH },
    ],
};