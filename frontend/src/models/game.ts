import { Card } from './card'

export type GameStatus = 'loading' | 'waiting' | 'playing'

export interface GameState {
  status: GameStatus
  turn: number
  direction: 'cw' | 'ccw'
  playedCard: Card | null
  players: {
    id: number
    name: string
    cardCount: number
  }[]
  myId: number
  myCard: Card[]
  isPickingColor: boolean
}
