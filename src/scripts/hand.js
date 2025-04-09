const Hand = {
    init() {
        $('#hand').empty();
        Decks.draw(LIFE_DECK);
        Decks.draw(LIFE_DECK);
        Decks.draw(LIFE_DECK);
    },
    addCard(name, deck) {
        const card = TileFactory.create(name, deck)
            .on('click', function() {
                if (deck === LIFE_DECK && !Board.canPlayCard(name)) {
                    return;
                }
                Board.playCard(name, deck);
                const oppositeDeck = deck === LIFE_DECK ? DEATH_DECK : LIFE_DECK;
                Decks.draw(oppositeDeck);
                $(this).remove();
                Hand.updateHandVisualization();
            })
            .on('mouseenter', function() {
                if (deck === DEATH_DECK) {
                    const deathCard = CARDS.death.find(c => c.name === name);
                    (deathCard?.removes || []).forEach(cardName => {
                        if (Board.isCardOnTopOfStack(cardName)) {
                            $('#board').find(`[name="${cardName}"]`).addClass('disabled');
                        }
                    });
                }
            })
            .on('mouseleave', function() {
                $('#board').find('.disabled').removeClass('disabled');
            });
        $('#hand').append(card);
        this.updateHandVisualization();
    },
    updateHandVisualization() {
        $('#hand').children().each(function() {
            const cardName = $(this).attr('name');
            const deck = $(this).attr('deck');
            // Only check playability for life cards
            const isPlayable = deck === LIFE_DECK ? Board.canPlayCard(cardName) : true;
            $(this).toggleClass('disabled', !isPlayable);
        });
    }
};
