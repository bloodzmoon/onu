"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generate the deck and shuffle
 * ALL card of total 108
 */
var generateDeck = function () {
    var deck = [];
    var colors = ['red', 'green', 'yellow', 'blue'];
    // Generate Number Card
    colors.forEach(function (c) {
        for (var i = 0; i < 10; i++) {
            var card = { type: 'N', content: "" + i, color: c };
            deck.push(card);
            if (i !== 0)
                deck.push(card);
        }
    });
    // Generate Acion Card
    colors.forEach(function (c) {
        var actions = ['+2', 'Rev', 'Skip'];
        actions.forEach(function (a) {
            var card = { type: 'A', content: a, color: c };
            deck.push(card);
            deck.push(card);
        });
    });
    // Generate Wild Card
    var wilds = ['Color', '+4'];
    wilds.forEach(function (w) {
        var card = { type: 'W', content: w, color: 'black' };
        for (var i = 0; i < 4; i++)
            deck.push(card);
    });
    return shuffle(deck);
};
/**
 * Shuffle array with the Fisher–Yates algorithm
 * copy this from internet...and it just work!
 */
var shuffle = function (array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
};
/**
 * Get the first Number card from deck
 */
var getFirstCard = function (deck) {
    var card = deck.find(function (c) { return c.type === 'N'; });
    var index = deck.indexOf(card);
    deck.splice(index, 1);
    return card;
};
/**
 * Reshuffle played cards into the deck so that
 * the deck never run out of card!
 */
var reShufflePlayedCards = function (deck, playedCards) {
    var lastestCard = playedCards.pop();
    var replayCard = playedCards.map(function (c) {
        if (c.type === 'W')
            return __assign(__assign({}, c), { color: 'black' });
        return c;
    });
    deck.push.apply(deck, replayCard);
    playedCards.splice(0, playedCards.length);
    playedCards.push(lastestCard);
    shuffle(deck);
};
exports.default = {
    generateDeck: generateDeck,
    shuffle: shuffle,
    getFirstCard: getFirstCard,
    reShufflePlayedCards: reShufflePlayedCards,
};
