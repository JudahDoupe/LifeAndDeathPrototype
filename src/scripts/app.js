$(document).ready(function() {
    Board.init();
    Decks.init();
    Hand.init();
});

const TileFactory = {
    create(name, deck) {
        return $(`<div class="card" deck="${deck}" name="${name}">${name}</div>`);
    }
};
