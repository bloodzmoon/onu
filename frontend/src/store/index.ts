import { atom } from 'recoil'

/**
 * Try to use `Recoil` to store global state
 * This global state store `GameID` and `PlayerName`
 */
interface GlobalState {
  id: string
  myName: string
  status: 'ENTER_NAME' | 'ENTER_GAME_ID' | 'LOADING' | 'PLAYING'
}

export const globalState = atom<GlobalState>({
  key: 'globalState',
  default: {
    id: '',
    myName: '',
    status: 'ENTER_NAME',
  },
})
