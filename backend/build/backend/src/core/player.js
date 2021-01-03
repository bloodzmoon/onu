"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deck_1 = __importDefault(require("../utils/deck"));
var message_1 = __importDefault(require("../utils/message"));
var Player = /** @class */ (function () {
    function Player(id, name, socket) {
        this.id = id;
        this.name = name;
        this.socket = socket;
        this.cards = [];
    }
    /**
     * If cards is passed to this function player will
     * use that cards as his own cards otherwise draw cards
     */
    Player.getDefault = function (game, cards) {
        var player = new Player(-1, 'Waiting', null);
        player.cards = cards || player.draw(game, 5);
        return player;
    };
    Player.prototype.draw = function (game, count) {
        var _a;
        var drawnCards = [];
        for (var i = 0; i < count; i++) {
            if (game.deck.length <= 0)
                deck_1.default.reShufflePlayedCards(game.deck, game.playedCards);
            var card = game.deck.pop();
            this.cards.push(card);
            drawnCards.push(card);
        }
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(message_1.default.draw(drawnCards));
        return drawnCards;
    };
    Player.prototype.play = function (card) {
        var index = this.cards.indexOf(card);
        this.cards.splice(index, 1);
    };
    Player.prototype.prepareCard = function () { };
    return Player;
}());
exports.default = Player;
