import WebSocket from 'ws'
import Http from 'http'
import Database from './core/db'
import Game from './core/game'
import Player from './core/player'
import Message from './utils/message'
import { InMessage } from './models/message'

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

      switch (msg.type) {
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

            game.state = game.isGameFull() ? 'playing' : 'waiting'
            socket.send(Message.init(game, playerId, drawnCards))
            if (game.state === 'playing') {
              socket.send(Message.update(game))
            }
            broadcast(socket, game, Message.update(game))
          }
          break

        case 'play':
          {
            const { gameId, playerId, card } = msg.payload
            const game = db.getGame(gameId)
            const player = game.players[playerId]
            if (!card) {
              const cards = player.draw(game.deck, 1)
              socket.send(Message.draw(cards))
            } else {
              player.play(card)
              game.playedCards.push(card)
              broadcast(socket, game, Message.card(card))
            }
            game.nextTurn()
            broadcast(socket, game, Message.update(game))
          }
          break

        default:
          break
      }
    })

    socket.on('close', () => {
      const game: Game | null = db.disconnect(socket)
      if (game) {
        game!.state = game!.isGameFull() ? 'playing' : 'stopping'
        broadcast(socket, game, Message.update(game))
        if (game!.isGameEmpty()) db.removeGame(game)
      }
    })
  })
}

export default {
  init,
}
