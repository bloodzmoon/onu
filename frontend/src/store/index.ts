import { atom } from 'recoil'
import { GameState } from '../models/game.model'

export const gameState = atom<GameState>({
  key: 'gameState',
  default: {
    id: '',
    status: 'LOADING',
    direction: 'clockwise',
    playerName: '',
    players: [],
    deck: [],
  },
})
