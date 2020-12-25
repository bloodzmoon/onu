// import { v4 as GenerateUUID } from 'uuid'
import WebSocket from 'ws'
import Player from './player'
import Deck from '../deck'
import { Card } from '../models/card.model'

class Game {
  readonly id: string
  readonly players: Player[]
  readonly deck: Card[]

  constructor(id: string) {
    this.id = id
    this.players = []
    this.deck = Deck.generateDeck()
  }

  show() {
    console.log('#', this.id)
    this.players.forEach((p) => p.show())
  }

  getPlayerBySocket(socket: WebSocket) {
    return this.players.find((p) => p.socket === socket)
  }

  addPlayer(player: Player) {
    const isExist = this.getPlayerBySocket(player.socket)
    if (!isExist) this.players.push(player)
  }

  removePlayer(player: Player) {
    const index = this.players.indexOf(player)
    if (index !== -1) this.players.splice(index, 1)
  }
}

export default Game
