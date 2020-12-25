import { Card } from './card.model'

export interface GameState {
  turn: number
  direction: 'cw' | 'ccw'
  players: {
    id: number
    name: string
    cardCount: number
  }[]
  myId: number
  myCard: Card[]
}
