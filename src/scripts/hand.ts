import { Constants, DeckType } from './types';
import { Decks } from './decks';
import { Board } from './board';
import { CARDS } from './cards';
import { CardFactory, HandUI } from './ui/UIManager';

export const Hand = {
    init(): void {
        HandUI.clearHand();
        Decks.draw(Constants.LIFE_DECK);
        Decks.draw(Constants.LIFE_DECK);
        Decks.draw(Constants.LIFE_DECK);
    },

    addCard(name: string, deck: DeckType): void {
        const card = CardFactory.create(name, deck)
            .on('click', function() {
                if (deck === Constants.LIFE_DECK && !Board.canPlayCard(name)) {
                    return;
                }
                Board.playCard(name, deck);
                const oppositeDeck = deck === Constants.LIFE_DECK ? Constants.DEATH_DECK : Constants.LIFE_DECK;
                Decks.draw(oppositeDeck);
                HandUI.removeCard(this);
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
        HandUI.addCard(card);
        this.updateHandVisualization();
    },

    updateHandVisualization(): void {
        HandUI.updatePlayability((cardName: string, deck: DeckType) => Board.canPlayCard(cardName));
    }
};