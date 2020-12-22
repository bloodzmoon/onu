import { atom } from 'recoil'

export interface Player {
  name: string
}

export const playerState = atom<Player>({
  key: 'playerState',
  default: {
    name: '',
  },
})
