import { Card } from './card'

export type GameStatus = 'loading' | 'waiting' | 'playing'

export interface GameState {
  status: GameStatus
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
