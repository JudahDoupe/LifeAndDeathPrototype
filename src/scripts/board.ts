import { CARDS } from './cards';
import { Constants, DeckType } from './types';
import { BoardUI, CardFactory } from './ui/UIManager';

export const Board = {
    init(): void {
        BoardUI.clearBoard();
        // Initialize empty stack slots
        for (let i = 0; i < 12; i++) {
            BoardUI.createNewStack();
        }
    },

    isCardOnTopOfStack(name: string): boolean {
        return BoardUI.findStackWithCard(name) !== null;
    },

    hasSpace(): boolean {
        return BoardUI.findEmptyStack() !== null;
    },

    hasAvailableStackForCard(name: string): boolean {
        const card = CARDS.life.find(card => card.name === name);
        if (!card) return false;
        
        if (card.requirements.length === 0) {
            return this.hasSpace();
        } else {
            const requiredCard = card.requirements[0];
            return this.isCardOnTopOfStack(requiredCard);
        }
    },

    playCard(name: string, deck: DeckType): void {
        const card = CardFactory.create(name, deck);
        if (deck === Constants.LIFE_DECK) {
            const lifeCard = CARDS.life.find(c => c.name === name);
            if (lifeCard?.requirements.length === 0) {
                const emptyStack = BoardUI.findEmptyStack();
                if (emptyStack) {
                    BoardUI.addCardToStack(emptyStack, card);
                }
            } else if (lifeCard) {
                const requiredCard = lifeCard.requirements[0];
                if (requiredCard) {
                    const targetStack = BoardUI.findStackWithCard(requiredCard);
                    if (targetStack) {
                        BoardUI.addCardToStack(targetStack, card);
                    }
                }
            }
        }
        if (deck === Constants.DEATH_DECK) {
            const deathCard = CARDS.death.find(c => c.name === name);
            deathCard?.removes.forEach(cardName => {
                if (this.isCardOnTopOfStack(cardName)) {
                    BoardUI.removeCard(cardName);
                }
            });
        }
    },

    containsCard(name: string): boolean {
        return BoardUI.findStackWithCard(name) !== null;
    },

    canPlayCard(name: string): boolean {
        const card = CARDS.life.find(card => card.name === name);
        if (!card) return true;
        
        return card.requirements.every(req => this.containsCard(req)) &&
               this.hasAvailableStackForCard(name);
    },
};