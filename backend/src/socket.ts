import WebSocket from 'ws'
import Http from 'http'
import Database from './core/db'
import Game from './core/game'
import Player from './core/player'
import Message from './utils/message'
import { InMessage } from './models/message.model'

/**
 * Create a WebSocket Server that will handle
 * all sockets connection
 */
const init = (server: Http.Server) => {
  const wss = new WebSocket.Server({ server })
  const db = new Database()

  const broadcast = (socket: WebSocket, game: Game, message: string) => {
    game.players.forEach((p) => {
      if (p.socket !== socket && p.socket) p.socket.send(message)
    })
  }

  wss.on('connection', (socket) => {
    socket.on('message', (message: string) => {
      const msg: InMessage = JSON.parse(message)

      switch (msg.action) {
        case 'join':
          {
            const { gameId, playerName } = msg.payload
            const game = db.getGame(gameId)
            const playerId = game.getEmptyId()
            const player = new Player(playerId, playerName, socket)
            const oldCards = game.players[playerId].cards
            const drawnCards = oldCards.length
              ? oldCards
              : player.draw(game.deck, 5)
            player.cards = drawnCards
            game.addPlayer(player)

            socket.send(Message.init(game, playerId, drawnCards))
            broadcast(socket, game, Message.update(game))

            console.log('----')
            db.show()
          }
          break

        default:
          break
      }
    })

    socket.on('close', () => {
      const game = db.disconnect(socket)
      if (game) broadcast(socket, game, Message.update(game))
    })
  })
}

export default {
  init,
}
