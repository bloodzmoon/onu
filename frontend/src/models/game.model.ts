import { Card } from './card.model'
import { Player } from './player.model'

export interface GameState {
  id: string
  status: 'LOADING' | 'OK'
  direction: 'clockwise' | 'couterclockwise'
  playerName: string
  players: Player[]
  deck: Card[]
}
