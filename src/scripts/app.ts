import { Board } from './board';
import { Decks } from './decks';
import { Hand } from './hand';
import { DeckType } from './types';

$(document).ready(function() {
    Board.init();
    Decks.init();
    Hand.init();
});

export const TileFactory = {
    create(name: string, deck: DeckType): JQuery<HTMLElement> {
        return $(`<div class="card" deck="${deck}" name="${name}">${name}</div>`);
    }
};