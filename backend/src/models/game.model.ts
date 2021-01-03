import { Card } from './card.model'

export type Direction = 'cw' | 'ccw'

export type ServerGameStatus = 'waiting' | 'playing'

export type ClientGameStatus = 'loading' | 'playing' | 'waiting' | 'gameover'

export type PlayerData = {
  id: number
  name: string
  cardCount: number
}

export type GameState = {
  status: ClientGameStatus
  turn: number
  direction: 'cw' | 'ccw'
  playedCard: Card | null
  players: PlayerData[]
  myId: number
  myCard: Card[]
  isPickingColor: boolean
  result: string[]
}
