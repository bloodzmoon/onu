import WebSocket from 'ws'
import { Card } from '../models/card.model'

class Player {
  readonly id: number
  readonly name: string
  readonly socket: WebSocket
  readonly cards: Card[]

  constructor(id: number, name: string, socket: WebSocket) {
    this.id = id
    this.name = name
    this.socket = socket
    this.cards = []
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
}

export default Player
