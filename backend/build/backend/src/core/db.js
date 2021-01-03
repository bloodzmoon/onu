"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __importDefault(require("./game"));
/**
 * Main database of Onu game server
 * contains many instance of Game
 */
var Database = /** @class */ (function () {
    function Database() {
        this.games = [];
    }
    Database.prototype.createGame = function (id) {
        var game = new game_1.default(id);
        this.games.push(game);
        return game;
    };
    Database.prototype.getGame = function (id) {
        var game = this.games.find(function (g) { return g.id === id; }) || this.createGame(id);
        return game;
    };
    Database.prototype.removeGame = function (id) {
        var index = this.games.findIndex(function (g) { return g.id === id; });
        this.games.splice(index, 1);
    };
    Database.prototype.isExist = function (id) {
        return this.games.find(function (g) { return g.id === id; }) !== undefined;
    };
    Database.prototype.disconnect = function (socket) {
        var fromGame = null;
        this.games.some(function (g) {
            var player = g.getPlayerBySocket(socket);
            if (player) {
                fromGame = g;
                g.removePlayer(player);
                return true;
            }
        });
        return fromGame;
    };
    return Database;
}());
exports.default = Database;
