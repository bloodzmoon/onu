import WebSocket from 'ws'
import Http from 'http'
import Database from './core/db'
import Game from './core/game'
import Player from './core/player'
import Message from './utils/message'
import { ClientMessage } from './models/message.model'

/**
 * Create a WebSocket Server that will handle
 * all sockets connection
 */
const init = (server: Http.Server) => {
  const wss = new WebSocket.Server({ server })
  const db = new Database()

  // Broadcast data to all player in that game
  const broadcast = (game: Game, message: string, exceptSocket?: WebSocket) => {
    game.players.forEach((p) => {
      if (p.socket !== exceptSocket) p.socket?.send(message)
    })
  }

  wss.on('connection', (socket) => {
    socket.on('message', (message: string) => {
      const msg: ClientMessage = JSON.parse(message)

      switch (msg.type) {
        case 'join':
          {
            const { gameId, playerName } = msg.payload
            const game = db.getGame(gameId)
            const playerId = game.getEmptyId()
            const player = new Player(playerId, playerName, socket)
            game.addPlayer(player)
            game.updateStatus()
            broadcast(game, Message.update(game))
          }
          break

        case 'play':
          {
            const { gameId, playerId, card } = msg.payload
            const game = db.getGame(gameId)
            const player = game.players[playerId]

            // Draw card otherwise Play card
            if (!card) {
              player.draw(game, 1)
              game.nextTurn()
            } else {
              game.playCard(player, card)
              broadcast(game, Message.card(card), socket)
            }
            broadcast(game, Message.update(game))

            if (game.isGameOver()) {
              broadcast(game, Message.gameover(game))
              db.removeGame(game.id)
            }
          }
          break
      }
    })

    socket.on('close', () => {
      const game = db.disconnect(socket)
      if (!game) return

      game.updateStatus()
      broadcast(game, Message.update(game), socket)

      if (game.isGameEmpty()) db.removeGame(game.id)
    })
  })
}

export default {
  init,
}
