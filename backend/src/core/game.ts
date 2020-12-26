import WebSocket from 'ws'
import Player from './player'
import Deck from '../utils/deck'
import { Card } from '../models/card.model'

/**
 * Game will contains all information about
 * Card and Player. Each player have an ID
 * and `turn` is a current player ID that playing
 */
class Game {
  readonly id: string
  readonly players: Player[]
  readonly deck: Card[]
  public direction: 'cw' | 'ccw'
  public turn: number

  constructor(id: string) {
    this.id = id
    this.players = Array(4).fill(Player.getNull())
    this.deck = Deck.generateDeck()
    this.direction = 'cw'
    this.turn = 0
  }

  show() {
    console.log('#', this.id)
    this.players.forEach((p) => p.show())
  }

  getEmptyId() {
    for (let i = 0; i < 4; i++) {
      if (this.players[i].id === -1) {
        return i
      }
    }
    return -1
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
    const isExist = this.getPlayerBySocket(player.socket!)
    if (!isExist) this.players[player.id] = player
  }

  removePlayer(player: Player) {
    const index = this.players.indexOf(player)
    if (index !== -1) this.players[index] = Player.getNull(player.cards)
  }
}

export default Game
