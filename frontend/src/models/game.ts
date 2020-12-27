import { Card } from './card'

export interface Player {
  id: number
  name: string
  cardCount: number
}

export interface GameState {
  status: 'LOADING' | 'PLAYING'
  turn: number
  direction: 'cw' | 'ccw'
  players: Player[]
  myId: number
  myCard: Card[]
}
