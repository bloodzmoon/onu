import WebSocket from 'ws'
import Player from './player'
import Deck from './deck'
import { Card } from '../models/card.model'

class Game {
  readonly id: string
  readonly players: Player[]
  readonly deck: Card[]
  public direction: 'cw' | 'ccw'
  public turn: number

  constructor(id: string) {
    this.id = id
    this.players = []
    this.deck = Deck.generateDeck()
    this.direction = 'cw'
    this.turn = 0
  }

  show() {
    console.log('#', this.id)
    this.players.forEach((p) => p.show())
  }

  getPlayerBySocket(socket: WebSocket) {
    return this.players.find((p) => p.socket === socket)
  }

  getPlayersData() {
    const players = this.players.map((p) => ({
      id: p.id,
      name: p.name,
      cardCount: p.cards.length,
    }))
    return players
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
