"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This message will be sent to player
 * that join game for the first time
 */
var init = function (game, playerId, cards) {
    var message = {
        type: 'init',
        payload: {
            turn: game.turn,
            direction: game.direction,
            players: game.getPlayersData(),
            playerId: playerId,
            cards: cards,
            playedCard: game.getLastestCard(),
        },
    };
    return JSON.stringify(message);
};
/**
 * This message will be sent when there is
 * any game update
 * eg. join / leave / nextTurn / changeDir / draw / play
 */
var update = function (game) {
    var message = {
        type: 'update',
        payload: {
            status: game.status,
            turn: game.turn,
            direction: game.direction,
            players: game.getPlayersData(),
        },
    };
    return JSON.stringify(message);
};
/**
 * Player that draw cards will get this message
 */
var draw = function (cards) {
    var message = {
        type: 'draw',
        payload: {
            cards: cards,
        },
    };
    return JSON.stringify(message);
};
/**
 * This message will be broadcast when someone
 * play a card
 */
var card = function (card) {
    var message = {
        type: 'card',
        payload: {
            card: card,
        },
    };
    return JSON.stringify(message);
};
/**
 * This message will be sent when the
 * game has ended
 */
var gameover = function (game) {
    var message = {
        type: 'gameover',
        payload: {
            result: game.getResult(),
        },
    };
    return JSON.stringify(message);
};
exports.default = {
    init: init,
    update: update,
    draw: draw,
    card: card,
    gameover: gameover,
};
