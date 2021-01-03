"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = __importDefault(require("./player"));
var deck_1 = __importDefault(require("../utils/deck"));
var message_1 = __importDefault(require("../utils/message"));
/**
 * Game will contains all information about
 * Card and Player. Each player have an ID
 * and `turn` is a current player ID that playing
 */
var Game = /** @class */ (function () {
    function Game(id) {
        var _this = this;
        this.id = id;
        this.deck = deck_1.default.generateDeck();
        this.players = Array(4)
            .fill('')
            .map(function () { return player_1.default.getDefault(_this); });
        this.playedCards = [deck_1.default.getFirstCard(this.deck)];
        this.direction = 'cw';
        this.turn = 0;
        this.status = 'waiting';
    }
    Game.prototype.getEmptyId = function () {
        return this.players.findIndex(function (p) { return p.id === -1; });
    };
    Game.prototype.isGameFull = function () {
        return this.getEmptyId() === -1;
    };
    Game.prototype.isGameEmpty = function () {
        return this.players.every(function (p) { return p.id === -1; });
    };
    Game.prototype.updateStatus = function () {
        this.status = this.isGameFull() ? 'playing' : 'waiting';
    };
    Game.prototype.getPlayerBySocket = function (socket) {
        return this.players.find(function (p) { return p.socket === socket; });
    };
    Game.prototype.getPlayersData = function () {
        var players = this.players.map(function (p) { return ({
            id: p.id,
            name: p.name,
            cardCount: p.cards.length,
        }); });
        return players;
    };
    Game.prototype.addPlayer = function (player) {
        var _a;
        var isExist = this.getPlayerBySocket(player.socket);
        if (isExist)
            return;
        var oldCards = this.players[player.id].cards;
        player.cards = oldCards;
        this.players[player.id] = player;
        (_a = player.socket) === null || _a === void 0 ? void 0 : _a.send(message_1.default.init(this, player.id, player.cards));
    };
    // Replace player with new instance of player but cards still alive
    Game.prototype.removePlayer = function (player) {
        var index = this.players.indexOf(player);
        if (index === -1)
            return;
        this.players[index] = player_1.default.getDefault(this, player.cards);
    };
    Game.prototype.playCard = function (player, card) {
        player.play(card);
        this.playedCards.push(card);
        switch (card.content) {
            case 'Rev':
                this.changeDirection();
                this.nextTurn();
                break;
            case 'Skip':
                this.nextTurn(2);
                break;
            case '+2':
                {
                    var nextPlayer = this.getNextPlayer();
                    nextPlayer.draw(this, 2);
                    this.nextTurn(2);
                }
                break;
            case '+4':
                {
                    var nextPlayer = this.getNextPlayer();
                    nextPlayer.draw(this, 4);
                    this.nextTurn(2);
                }
                break;
            default:
                this.nextTurn();
        }
    };
    Game.prototype.changeDirection = function () {
        var newDir = this.direction === 'cw' ? 'ccw' : 'cw';
        this.direction = newDir;
    };
    Game.prototype.getNextTurn = function (n) {
        if (n === void 0) { n = 1; }
        var unit = this.direction === 'cw' ? +n : -n;
        var nextTurn = (this.turn + unit) % 4;
        if (nextTurn < 0)
            nextTurn = 4 + nextTurn;
        return nextTurn;
    };
    Game.prototype.nextTurn = function (n) {
        if (n === void 0) { n = 1; }
        this.turn = this.getNextTurn(n);
    };
    Game.prototype.getNextPlayer = function () {
        var next = this.getNextTurn();
        return this.players[next];
    };
    Game.prototype.getLastestCard = function () {
        return this.playedCards[this.playedCards.length - 1];
    };
    Game.prototype.isGameOver = function () {
        return this.players.some(function (p) { return p.cards.length === 0; });
    };
    Game.prototype.getResult = function () {
        var players = __spreadArrays(this.players);
        var result = players.sort(function (a, b) { return a.cards.length - b.cards.length; });
        return result.map(function (r) { return r.name; });
    };
    return Game;
}());
exports.default = Game;
