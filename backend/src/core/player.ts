import WebSocket from 'ws'
import Deck from '../utils/deck'
import { Card } from '../models/card'
import Game from './game'

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

  draw(game: Game, count: number) {
    const drawnCards = []
    for (let i = 0; i < count; i++) {
      if (game.deck.length > 0) {
        const card = game.deck.pop()
        this.cards.push(card!)
        drawnCards.push(card!)
      } else {
        const lastestCard = game.playedCards.pop()
        const replayCard: Card[] = game.playedCards.map((c) => {
          if (c.type === 'W') return { ...c, color: 'black' }
          return c
        })
        game.deck.push(...replayCard)
        game.playedCards.splice(0, game.playedCards.length)
        game.playedCards.push(lastestCard!)
        Deck.shuffle(game.deck)

        const card = game.deck.pop()
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
