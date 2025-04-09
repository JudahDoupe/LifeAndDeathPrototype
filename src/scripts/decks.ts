import { Constants, DeckType, LifeCard, DeathCard } from './types';
import { CARDS } from './cards';
import { Hand } from './hand';

export const Decks = {
    init(): void {
        this.clearDeck(Constants.LIFE_DECK);
        this.clearDeck(Constants.DEATH_DECK);
        this.shuffleAndAddToDeck(CARDS.life.slice(0, 2), Constants.LIFE_DECK);
        this.shuffleAndAddToDeck(CARDS.life.slice(0, 6), Constants.LIFE_DECK);
        this.shuffleAndAddToDeck(CARDS.life, Constants.LIFE_DECK);
        this.shuffleAndAddToDeck(CARDS.death.slice(0, 2), Constants.DEATH_DECK);
        this.shuffleAndAddToDeck(CARDS.death.slice(0, 6), Constants.DEATH_DECK);
        this.shuffleAndAddToDeck(CARDS.death, Constants.DEATH_DECK);
    },
    
    clearDeck(deck: DeckType): void {
        const deckElement = $(`#${deck}-deck`);
        deckElement.data('cards', []);
        this.updateDeckCount(deck);
    },

    shuffleAndAddToDeck(cards: (LifeCard | DeathCard)[], deck: DeckType): void {
        const deckElement = $(`#${deck}-deck`);
        const existingCards = deckElement.data('cards') || [];
        const shuffledNewCards = cards.slice().sort(() => Math.random() - 0.5);
        deckElement.data('cards', [...existingCards, ...shuffledNewCards]);
        this.updateDeckCount(deck);
    },

    drawLife(): void {
        this.draw(Constants.LIFE_DECK);
    },

    drawDeath(): void {
        this.draw(Constants.DEATH_DECK);
    },

    draw(deck: DeckType): void {
        const deckElement = $(`#${deck}-deck`);
        const cards = deckElement.data('cards') || [];
        if (cards.length) {
            const card = cards.shift();
            Hand.addCard(card.name, deck);
            this.updateDeckCount(deck);
        }
    },

    updateDeckCount(deck: DeckType): void {
        const deckElement = $(`#${deck}-deck`);
        const cards = deckElement.data('cards') || [];
        $(`#${deck}-deck-count`).text(cards.length);
    },
};