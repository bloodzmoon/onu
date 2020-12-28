import WebSocket from 'ws'
import { Card } from '../models/card'

class Player {
  readonly id: number
  readonly name: string
  readonly socket: WebSocket | null
  public cards: Card[]

  constructor(id: number, name: string, socket: WebSocket | null) {
    this.id = id
    this.name = name
    this.socket = socket
    this.cards = []
  }

  static getNull(cards?: Card[]) {
    const nullPlayer = new Player(-1, 'Waiting', null)
    nullPlayer.cards = cards || []
    return nullPlayer
  }

  show() {
    console.log(` ${this.name}[${this.id}] : ${this.cards.length} card`)
  }

  draw(deck: Card[], count: number) {
    const drawnCards = []
    for (let i = 0; i < count; i++) {
      if (deck.length > 0) {
        const card = deck.pop()
        this.cards.push(card!)
        drawnCards.push(card!)
      }
    }
    return drawnCards
  }

  play(card: Card) {
    const index = this.cards.indexOf(card)
    this.cards.splice(index, 1)
  }
}

export default Player
