import WebSocket from 'ws'
import Game from './game'

/**
 * Main database of Onu game server
 * contains many instance of Game
 */
class Database {
  private games: Game[]

  constructor() {
    this.games = []
  }

  show() {
    this.games.forEach((g) => g.show())
  }

  createGame(id: string) {
    const game = new Game(id)
    this.games.push(game)
    return game
  }

  getGame(id: string) {
    const game = this.games.find((g) => g.id === id) || this.createGame(id)
    return game
  }

  isExist(id: string) {
    return this.games.find((g) => g.id === id) !== undefined
  }

  disconnect(socket: WebSocket) {
    let fromGame: Game | null = null
    this.games.some((g) => {
      const player = g.getPlayerBySocket(socket)
      if (player) {
        fromGame = g
        g.removePlayer(player)
        return true
        // console.log(`! ${player.name} has left game ${g.id}`)
      }
    })
    return fromGame
  }
}

export default Database
