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
      if (p.socket !== socket) p.socket.send(message)
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
            const playerId = game.players.length
            const player = new Player(playerId, playerName, socket)
            const drawnCards = player.draw(game.deck, 5)
            game.addPlayer(player)
            socket.send(Message.init(game, playerId, drawnCards))
            broadcast(socket, game, Message.join(game))

            console.log('----')
            db.show()
          }
          break

        default:
          break
      }
    })

    socket.on('close', () => {
      db.disconnect(socket)
    })
  })
}

export default {
  init,
}
