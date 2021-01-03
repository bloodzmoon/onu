import WebSocket from 'ws'
import Deck from '../utils/deck'
import Message from '../utils/message'
import Game from './game'
import { Card } from '../models/card.model'

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

  /**
   * If cards is passed to this function player will
   * use that cards as his own cards otherwise draw cards
   */
  static getDefault(game: Game, cards?: Card[]) {
    const player = new Player(-1, 'Waiting', null)
    player.cards = cards || player.draw(game, 5)
    return player
  }

  draw(game: Game, count: number) {
    const drawnCards = []
    for (let i = 0; i < count; i++) {
      if (game.deck.length <= 0)
        Deck.reShufflePlayedCards(game.deck, game.playedCards)

      const card = game.deck.pop()
      this.cards.push(card!)
      drawnCards.push(card!)
    }
    this.socket?.send(Message.draw(drawnCards))
    return drawnCards
  }

  play(card: Card) {
    const index = this.cards.indexOf(card)
    this.cards.splice(index, 1)
  }

  prepareCard() {}
}

export default Player
