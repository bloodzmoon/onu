import { atom } from 'recoil'
import { Player } from './player'

interface Game {
  id: string
  status: 'LOADING' | 'OK'
  players: Player[]
}

export const gameState = atom<Game>({
  key: 'gameState',
  default: {
    id: '',
    status: 'LOADING',
    players: [],
  },
})
