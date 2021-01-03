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

  createGame(id: string) {
    const game = new Game(id)
    this.games.push(game)
    return game
  }

  getGame(id: string) {
    const game = this.games.find((g) => g.id === id) || this.createGame(id)
    return game
  }

  removeGame(id: string) {
    const index = this.games.findIndex((g) => g.id === id)
    this.games.splice(index, 1)
  }

  isExist(id: string) {
    return this.games.find((g) => g.id === id) !== undefined
  }

  disconnect(socket: WebSocket): Game | null {
    let fromGame: Game | null = null
    this.games.some((g) => {
      const player = g.getPlayerBySocket(socket)
      if (player) {
        fromGame = g
        g.removePlayer(player)
        return true
      }
    })
    return fromGame
  }
}

export default Database
