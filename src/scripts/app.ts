import { Board } from './board';
import { Decks } from './decks';
import { Hand } from './hand';

$(document).ready(function() {
    Board.init();
    Decks.init();
    Hand.init();
});