import WebSocket from 'ws'
import Http from 'http'
import Database from './core/db'
import Player from './core/player'
import { Message } from './models/message.model'

/**
 * Create a WebSocket Server that will handle
 * all sockets connection
 */
const init = (server: Http.Server) => {
  const wss = new WebSocket.Server({ server })
  const db = new Database()

  wss.on('connection', (socket) => {
    socket.on('message', (msg: string) => {
      const { action, payload }: Message = JSON.parse(msg)

      switch (action) {
        case 'join':
          {
            const { gameId, playerName } = payload
            const game = db.getGame(gameId)
            const player = new Player(playerName, socket)
            game.addPlayer(player)
            console.log('----')
            db.show()
            // socket.send(JSON.stringify({ action: 'deck', payload: game.deck }))
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
