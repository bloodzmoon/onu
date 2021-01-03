"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var db_1 = __importDefault(require("./core/db"));
var player_1 = __importDefault(require("./core/player"));
var message_1 = __importDefault(require("./utils/message"));
/**
 * Create a WebSocket Server that will handle
 * all sockets connection
 */
var init = function (server) {
    var wss = new ws_1.default.Server({ server: server });
    var db = new db_1.default();
    // Broadcast data to all player in that game
    var broadcast = function (game, message, exceptSocket) {
        game.players.forEach(function (p) {
            var _a;
            if (p.socket !== exceptSocket)
                (_a = p.socket) === null || _a === void 0 ? void 0 : _a.send(message);
        });
    };
    wss.on('connection', function (socket) {
        socket.on('message', function (message) {
            var msg = JSON.parse(message);
            switch (msg.type) {
                case 'join':
                    {
                        var _a = msg.payload, gameId = _a.gameId, playerName = _a.playerName;
                        var game = db.getGame(gameId);
                        var playerId = game.getEmptyId();
                        var player = new player_1.default(playerId, playerName, socket);
                        game.addPlayer(player);
                        game.updateStatus();
                        broadcast(game, message_1.default.update(game));
                    }
                    break;
                case 'play':
                    {
                        var _b = msg.payload, gameId = _b.gameId, playerId = _b.playerId, card = _b.card;
                        var game = db.getGame(gameId);
                        var player = game.players[playerId];
                        // Draw card otherwise Play card
                        if (!card) {
                            player.draw(game, 1);
                            game.nextTurn();
                        }
                        else {
                            game.playCard(player, card);
                            broadcast(game, message_1.default.card(card), socket);
                        }
                        broadcast(game, message_1.default.update(game));
                        if (game.isGameOver()) {
                            broadcast(game, message_1.default.gameover(game));
                            db.removeGame(game.id);
                        }
                    }
                    break;
            }
        });
        socket.on('close', function () {
            var game = db.disconnect(socket);
            if (!game)
                return;
            game.updateStatus();
            broadcast(game, message_1.default.update(game), socket);
            if (game.isGameEmpty())
                db.removeGame(game.id);
        });
    });
};
exports.default = {
    init: init,
};
