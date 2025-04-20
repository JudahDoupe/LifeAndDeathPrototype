import { DeckType } from './types/game.types';

export interface CardData {
    name: string;
    deck: DeckType;
    id?: string;
}

export interface LifeCard extends CardData {
    requirements: string[];
    phRange: {
        min: number;
        max: number;
    };
}

export interface DeathCard extends CardData {
    phChange: number; // How much this card changes the board pH
}

export type AllCards = {
    life: LifeCard[];
    death: DeathCard[];
};

export const ALLCARDS: AllCards = {
    life: [
        ...[...Array(4)].map(() => ({ name: 'Moss', requirements: [], phRange: { min: 6, max: 7 }, deck: DeckType.LIFE })),
        ...[...Array(4)].map(() => ({ name: 'Algea', requirements: [], phRange: { min: 6, max: 8 }, deck: DeckType.LIFE })),
        ...[...Array(4)].map(() => ({ name: 'Duckweed', requirements: [], phRange: { min: 7, max: 8 }, deck: DeckType.LIFE })),
        ...[...Array(3)].map(() => ({ name: 'Protozoa', requirements: ['Algea', 'Bacteria'], phRange: { min: 6, max: 7 }, deck: DeckType.LIFE })),
        ...[...Array(3)].map(() => ({ name: 'Bacteria', requirements: ['Algea', 'Moss', 'Duckweed'], phRange: { min: 6, max: 8 }, deck: DeckType.LIFE })),
        ...[...Array(3)].map(() => ({ name: 'Fungi', requirements: ['Algea', 'Duckweed'], phRange: { min: 7, max: 8 }, deck: DeckType.LIFE })),
        ...[...Array(2)].map(() => ({ name: 'Beetle', requirements: ['Protozoa'], phRange: { min: 6, max: 7 }, deck: DeckType.LIFE })),
        ...[...Array(2)].map(() => ({ name: 'Fly', requirements: ['Protozoa', 'Fungi'], phRange: { min: 6, max: 8 }, deck: DeckType.LIFE })),
        ...[...Array(2)].map(() => ({ name: 'Snails', requirements: ['Fungi'], phRange: { min: 7, max: 8 }, deck: DeckType.LIFE })),
        { name: 'Pitcher Plant', requirements: ['Fly', 'Beetle'], phRange: { min: 6, max: 7 }, deck: DeckType.LIFE },
        { name: 'Frogs', requirements: ['Fly', 'Snails', 'Beetle'], phRange: { min: 6, max: 8 }, deck: DeckType.LIFE },
        { name: 'Slamanders', requirements: ['Fly', 'Snails', 'Beetle'], phRange: { min: 7, max: 8 }, deck: DeckType.LIFE }
    ],
    death: [
        ...[...Array(8)].map(() => ({ name: 'Decay', phChange: -0.25, deck: DeckType.DEATH })),
        ...[...Array(8)].map(() => ({ name: 'Photosynthesis', phChange: 0.25, deck: DeckType.DEATH })),
        ...[...Array(4)].map(() => ({ name: 'Rain', phChange: -0.5, deck: DeckType.DEATH })),
        ...[...Array(4)].map(() => ({ name: 'Cold Front', phChange: 0.5, deck: DeckType.DEATH })),
        ...[...Array(2)].map(() => ({ name: 'Storm', phChange: -0.75, deck: DeckType.DEATH })),
        ...[...Array(2)].map(() => ({ name: 'Decay 2', phChange: 0.75, deck: DeckType.DEATH })),
        { name: 'Acid Rain', phChange: -1, deck: DeckType.DEATH },
        { name: 'Farm Runoff', phChange: 1, deck: DeckType.DEATH },
    ],
};