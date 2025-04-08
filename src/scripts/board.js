const Board = {
    init() {
        $('#tier-1').empty();  
        $('#tier-2').empty();
        $('#tier-3').empty();
    },
    playCard(name, deck, tier) {
        const card = TileFactory.create(name, deck);
        if (deck === LIFE_DECK) {
            $(`#tier-${tier}`).append(card);
        }
        if (deck === DEATH_DECK) {
            const deathCard = CARDS.death.find(c => c.name === name);
            (deathCard?.removes || []).forEach(cardName => {
                if (!deathCard.protectedBy.some(protector => this.containsCard(protector))) {
                    this.removeCard(cardName);
                }
            });
        }
    },
    removeCard(name) {
        $('#tier-1').children(`[name="${name}"]`).remove();
        $('#tier-2').children(`[name="${name}"]`).remove();
        $('#tier-3').children(`[name="${name}"]`).remove();
    },
    containsCard(name) {
        return $('#tier-1').children(`[name="${name}"]`).length > 0 ||
               $('#tier-2').children(`[name="${name}"]`).length > 0 ||
               $('#tier-3').children(`[name="${name}"]`).length > 0;
    },
    canPlayCard(name) {
        const card = CARDS.life.find(card => card.name === name);
        return (card?.requirements || []).every(req => this.containsCard(req));
    },
};
