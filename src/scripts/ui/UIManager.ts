import { DeckType } from '../types';

export class CardFactory {
    static create(name: string, deck: DeckType): JQuery<HTMLElement> {
        return $(`<div class="card" deck="${deck}" name="${name}">${name}</div>`);
    }
}

export class BoardUI {
    static createNewStack(): JQuery<HTMLElement> {
        const stack = $('<div class="card-stack"></div>');
        $('#board').append(stack);
        return stack;
    }

    static clearBoard(): void {
        $('#board').empty();
    }

    static addCardToStack(stack: JQuery<HTMLElement>, card: JQuery<HTMLElement>): void {
        stack.append(card);
    }

    static removeCard(name: string): void {
        $('.card-stack').find(`[name="${name}"]`).remove();
    }

    static disableCard(name: string): void {
        $('#board').find(`[name="${name}"]`).addClass('disabled');
    }

    static enableCard(name: string): void {
        $('#board').find(`[name="${name}"]`).removeClass('disabled');
    }

    static findStackWithCard(cardName: string): JQuery<HTMLElement> | null {
        const stacks = $('.card-stack');
        for (let i = 0; i < stacks.length; i++) {
            const topCard = $(stacks[i]).children().last();
            if (topCard.attr('name') === cardName) {
                return $(stacks[i]);
            }
        }
        return null;
    }

    static findEmptyStack(): JQuery<HTMLElement> | null {
        const stacks = $('.card-stack');
        for (let i = 0; i < stacks.length; i++) {
            if ($(stacks[i]).children().length === 0) {
                return $(stacks[i]);
            }
        }
        return null;
    }
}

export class HandUI {
    static clearHand(): void {
        $('#hand').empty();
    }

    static addCard(card: JQuery<HTMLElement>): void {
        $('#hand').append(card);
    }

    static removeCard(element: HTMLElement): void {
        $(element).remove();
    }

    static disableCard(name: string): void {
        $('#hand').find(`[name="${name}"]`).addClass('disabled');
    }

    static enableCard(name: string): void {
        $('#hand').find(`[name="${name}"]`).removeClass('disabled');
    }

    static updatePlayability(isCardPlayable: (cardName: string, deck: DeckType) => boolean): void {
        $('#hand').children().each(function() {
            const cardName = $(this).attr('name')!;
            const deck = $(this).attr('deck') as DeckType;
            const isPlayable = deck === 'life' ? isCardPlayable(cardName, deck) : true;
            $(this).toggleClass('disabled', !isPlayable);
        });
    }
}

export class DecksUI {
    static updateDeckCount(deck: DeckType, count: number): void {
        $(`#${deck}-deck-count`).text(count);
    }
}