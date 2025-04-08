const LIFE_DECK = 'life';
const DEATH_DECK = 'death';
const Decks = {
    init() {
        this.shuffleAndResetDeck(CARDS.life, LIFE_DECK);
        this.shuffleAndResetDeck(CARDS.death, DEATH_DECK);
    },
    shuffleAndResetDeck(cards, deck) {
        const deckElement = $(`#${deck}-deck`);
        const sortedCards = cards.slice().sort(() => Math.random() - 0.5).sort((a, b) => a.tier - b.tier); 
        deckElement.data('cards', sortedCards);
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
            Hand.addCard(card.name, deck, card.tier);
            this.updateDeckCount(deck);
        }
    },
    updateDeckCount(deck) {
        const deckElement = $(`#${deck}-deck`);
        const cards = deckElement.data('cards') || [];
        $(`#${deck}-deck-count`).text(cards.length);
    },
};
