const Board = {
    init() {
        $('#board').empty();
        // Initialize empty stack slots
        for (let i = 0; i < 12; i++) {
            this.createNewStack();
        }
    },
    findStackWithCard(cardName) {
        const stacks = $('.card-stack');
        for (let i = 0; i < stacks.length; i++) {
            const topCard = $(stacks[i]).children().last();
            if (topCard.attr('name') === cardName) {
                return $(stacks[i]);
            }
        }
        return null;
    },
    createNewStack() {
        const stack = $('<div class="card-stack"></div>');
        $('#board').append(stack);
        return stack;
    },
    isCardOnTopOfStack(name) {
        const stacks = $('.card-stack');
        for (let i = 0; i < stacks.length; i++) {
            const topCard = $(stacks[i]).children().last();
            if (topCard.attr('name') === name) {
                return true;
            }
        }
        return false;
    },
    findEmptyStack() {
        const stacks = $('.card-stack');
        for (let i = 0; i < stacks.length; i++) {
            if ($(stacks[i]).children().length === 0) {
                return $(stacks[i]);
            }
        }
        return null;
    },
    hasSpace() {
        return this.findEmptyStack() !== null;
    },
    hasAvailableStackForCard(name) {
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
    playCard(name, deck) {
        const card = TileFactory.create(name, deck);
        if (deck === LIFE_DECK) {
            const lifeCard = CARDS.life.find(c => c.name === name);
            if (lifeCard.requirements.length === 0) {
                const emptyStack = this.findEmptyStack();
                if (emptyStack) {
                    emptyStack.append(card);
                }
            } else {
                const requiredCard = lifeCard.requirements[0];
                const targetStack = this.findStackWithCard(requiredCard);
                if (targetStack) {
                    targetStack.append(card);
                }
            }
        }
        if (deck === DEATH_DECK) {
            const deathCard = CARDS.death.find(c => c.name === name);
            (deathCard?.removes || []).forEach(cardName => {
                if (this.isCardOnTopOfStack(cardName)) {
                    this.removeCard(cardName);
                }
            });
        }
    },
    removeCard(name) {
        $('.card-stack').find(`[name="${name}"]`).remove();
        // Remove empty stacks
        $('.card-stack:empty').remove();
    },
    containsCard(name) {
        return $('.card-stack').find(`[name="${name}"]`).length > 0;
    },
    canPlayCard(name) {
        const card = CARDS.life.find(card => card.name === name);
        // If it's not a life card, it must be a death card which can always be played
        if (!card) return true;
        
        // Life cards still need to check requirements and stack availability
        return (card?.requirements || []).every(req => this.containsCard(req)) &&
               this.hasAvailableStackForCard(name);
    },
};
