import WebSocket from 'ws'
import Player from './player'
import Deck from '../utils/deck'
import Message from '../utils/message'
import { Card } from '@shared/card.model'
import { Direction, ServerGameStatus } from '@shared/game.model'

/**
 * Game will contains all information about
 * Card and Player. Each player have an ID
 * and `turn` is a current player ID that playing
 */
class Game {
  readonly id: string
  readonly players: Player[]
  readonly deck: Card[]
  readonly playedCards: Card[]
  public direction: Direction
  public turn: number
  public status: ServerGameStatus

  constructor(id: string) {
    this.id = id
    this.deck = Deck.generateDeck()
    this.players = Array(4)
      .fill('')
      .map(() => Player.getDefault(this))
    this.playedCards = [Deck.getFirstCard(this.deck)!]
    this.direction = 'cw'
    this.turn = 0
    this.status = 'waiting'
  }

  getEmptyId() {
    return this.players.findIndex((p) => p.id === -1)
  }

  isGameFull() {
    return this.getEmptyId() === -1
  }

  isGameEmpty() {
    return this.players.every((p) => p.id === -1)
  }

  updateStatus() {
    this.status = this.isGameFull() ? 'playing' : 'waiting'
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
    if (isExist) return
    const oldCards = this.players[player.id].cards
    player.cards = oldCards

    this.players[player.id] = player
    player.socket?.send(Message.init(this, player.id, player.cards))
  }

  // Replace player with new instance of player but cards still alive
  removePlayer(player: Player) {
    const index = this.players.indexOf(player)
    if (index === -1) return
    this.players[index] = Player.getDefault(this, player.cards)
  }

  playCard(player: Player, card: Card) {
    player.play(card)
    this.playedCards.push(card)
    switch (card.content) {
      case 'Rev':
        this.changeDirection()
        this.nextTurn()
        break
      case 'Skip':
        this.nextTurn(2)
        break
      case '+2':
        {
          const nextPlayer = this.getNextPlayer()
          nextPlayer.draw(this, 2)
          this.nextTurn(2)
        }
        break
      case '+4':
        {
          const nextPlayer = this.getNextPlayer()
          nextPlayer.draw(this, 4)
          this.nextTurn(2)
        }
        break
      default:
        this.nextTurn()
    }
  }

  changeDirection() {
    const newDir = this.direction === 'cw' ? 'ccw' : 'cw'
    this.direction = newDir
  }

  getNextTurn(n: number = 1) {
    const unit = this.direction === 'cw' ? +n : -n
    let nextTurn = (this.turn + unit) % 4
    if (nextTurn < 0) nextTurn = 4 + nextTurn
    return nextTurn
  }

  nextTurn(n: number = 1) {
    this.turn = this.getNextTurn(n)
  }

  getNextPlayer() {
    const next = this.getNextTurn()
    return this.players[next]
  }

  getLastestCard() {
    return this.playedCards[this.playedCards.length - 1]
  }

  isGameOver() {
    return this.players.some((p) => p.cards.length === 0)
  }

  getResult() {
    const players = [...this.players]
    const result = players.sort((a, b) => a.cards.length - b.cards.length)
    return result.map((r) => r.name)
  }
}

export default Game
