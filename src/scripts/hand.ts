import { Constants, DeckType } from './types';
import { Decks } from './decks';
import { Board } from './board';
import { CARDS } from './cards';
import { TileFactory } from './app';

export const Hand = {
    init(): void {
        $('#hand').empty();
        Decks.draw(Constants.LIFE_DECK);
        Decks.draw(Constants.LIFE_DECK);
        Decks.draw(Constants.LIFE_DECK);
    },

    addCard(name: string, deck: DeckType): void {
        const card = TileFactory.create(name, deck)
            .on('click', function() {
                if (deck === Constants.LIFE_DECK && !Board.canPlayCard(name)) {
                    return;
                }
                Board.playCard(name, deck);
                const oppositeDeck = deck === Constants.LIFE_DECK ? Constants.DEATH_DECK : Constants.LIFE_DECK;
                Decks.draw(oppositeDeck);
                $(this).remove();
                Hand.updateHandVisualization();
            })
            .on('mouseenter', function() {
                if (deck === Constants.DEATH_DECK) {
                    const deathCard = CARDS.death.find(c => c.name === name);
                    deathCard?.removes.forEach(cardName => {
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

    updateHandVisualization(): void {
        $('#hand').children().each(function() {
            const cardName = $(this).attr('name');
            const deck = $(this).attr('deck') as DeckType;
            // Only check playability for life cards
            const isPlayable = deck === Constants.LIFE_DECK ? Board.canPlayCard(cardName!) : true;
            $(this).toggleClass('disabled', !isPlayable);
        });
    }
};