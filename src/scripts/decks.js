const LIFE_DECK = 'life';
const DEATH_DECK = 'death';
const Decks = {
    init() {
        this.clearDeck(LIFE_DECK);
        this.clearDeck(DEATH_DECK);
        this.shuffleAndAddToDeck(CARDS.life.slice(0, 2), LIFE_DECK);
        this.shuffleAndAddToDeck(CARDS.life.slice(0, 6), LIFE_DECK);
        this.shuffleAndAddToDeck(CARDS.life, LIFE_DECK);
        this.shuffleAndAddToDeck(CARDS.death.slice(0, 2), DEATH_DECK);
        this.shuffleAndAddToDeck(CARDS.death.slice(0, 6), DEATH_DECK);
        this.shuffleAndAddToDeck(CARDS.death, DEATH_DECK);
    },
    clearDeck(deck) {
        const deckElement = $(`#${deck}-deck`);
        deckElement.data('cards', []);
        this.updateDeckCount(deck);
    },
    shuffleAndAddToDeck(cards, deck) {
        const deckElement = $(`#${deck}-deck`);
        const existingCards = deckElement.data('cards') || [];
        const shuffledNewCards = cards.slice().sort(() => Math.random() - 0.5);
        deckElement.data('cards', [...existingCards, ...shuffledNewCards]);
        this.updateDeckCount(deck);
    },
    drawLife() {
        this.draw(LIFE_DECK);
    },
    drawDeath() {
        this.draw(DEATH_DECK);
    },
    draw(deck) {
        const deckElement = $(`#${deck}-deck`);
        const cards = deckElement.data('cards') || [];
        if (cards.length) {
            const card = cards.shift();
            Hand.addCard(card.name, deck);
            this.updateDeckCount(deck);
        }
    },
    updateDeckCount(deck) {
        const deckElement = $(`#${deck}-deck`);
        const cards = deckElement.data('cards') || [];
        $(`#${deck}-deck-count`).text(cards.length);
    },
};
