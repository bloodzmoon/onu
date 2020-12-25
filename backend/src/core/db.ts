import WebSocket from 'ws'
import Game from './game'

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
    this.games.forEach((g) => {
      const player = g.getPlayerBySocket(socket)
      if (player) g.removePlayer(player)
    })
  }
}

export default Database
