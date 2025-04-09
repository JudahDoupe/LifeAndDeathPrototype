import { CARDS } from './cards';
import { Constants, DeckType } from './types';
import { TileFactory } from './app';

export const Board = {
    init(): void {
        $('#board').empty();
        // Initialize empty stack slots
        for (let i = 0; i < 12; i++) {
            this.createNewStack();
        }
    },

    findStackWithCard(cardName: string): JQuery<HTMLElement> | null {
        const stacks = $('.card-stack');
        for (let i = 0; i < stacks.length; i++) {
            const topCard = $(stacks[i]).children().last();
            if (topCard.attr('name') === cardName) {
                return $(stacks[i]);
            }
        }
        return null;
    },

    createNewStack(): JQuery<HTMLElement> {
        const stack = $('<div class="card-stack"></div>');
        $('#board').append(stack);
        return stack;
    },

    isCardOnTopOfStack(name: string): boolean {
        const stacks = $('.card-stack');
        for (let i = 0; i < stacks.length; i++) {
            const topCard = $(stacks[i]).children().last();
            if (topCard.attr('name') === name) {
                return true;
            }
        }
        return false;
    },

    findEmptyStack(): JQuery<HTMLElement> | null {
        const stacks = $('.card-stack');
        for (let i = 0; i < stacks.length; i++) {
            if ($(stacks[i]).children().length === 0) {
                return $(stacks[i]);
            }
        }
        return null;
    },

    hasSpace(): boolean {
        return this.findEmptyStack() !== null;
    },

    hasAvailableStackForCard(name: string): boolean {
        const card = CARDS.life.find(card => card.name === name);
        if (!card) return false;
        
        if (card.requirements.length === 0) {
            // For cards with no requirements, check if there's space
            return this.hasSpace();
        } else {
            // For cards with requirements, check if there's a stack with the required card on top
            const requiredCard = card.requirements[0];
            return this.isCardOnTopOfStack(requiredCard);
        }
    },

    playCard(name: string, deck: DeckType): void {
        const card = TileFactory.create(name, deck);
        if (deck === Constants.LIFE_DECK) {
            const lifeCard = CARDS.life.find(c => c.name === name);
            if (lifeCard?.requirements.length === 0) {
                const emptyStack = this.findEmptyStack();
                if (emptyStack) {
                    emptyStack.append(card);
                }
            } else if (lifeCard) {
                const requiredCard = lifeCard.requirements[0];
                if (requiredCard) {
                    const targetStack = this.findStackWithCard(requiredCard);
                    if (targetStack) {
                        targetStack.append(card);
                    }
                }
            }
        }
        if (deck === Constants.DEATH_DECK) {
            const deathCard = CARDS.death.find(c => c.name === name);
            deathCard?.removes.forEach(cardName => {
                if (this.isCardOnTopOfStack(cardName)) {
                    this.removeCard(cardName);
                }
            });
        }
    },

    removeCard(name: string): void {
        $('.card-stack').find(`[name="${name}"]`).remove();
        // Remove empty stacks
        $('.card-stack:empty').remove();
    },

    containsCard(name: string): boolean {
        return $('.card-stack').find(`[name="${name}"]`).length > 0;
    },

    canPlayCard(name: string): boolean {
        const card = CARDS.life.find(card => card.name === name);
        // If it's not a life card, it must be a death card which can always be played
        if (!card) return true;
        
        // Life cards still need to check requirements and stack availability
        return card.requirements.every(req => this.containsCard(req)) &&
               this.hasAvailableStackForCard(name);
    },
};