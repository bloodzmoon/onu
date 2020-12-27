import { atom } from 'recoil'

/**
 * Try to use `Recoil` to store global state
 * This global state store `GameID` and `PlayerName`
 */
interface GlobalState {
  gameId: string
  myName: string
}

export const globalState = atom<GlobalState>({
  key: 'globalState',
  default: {
    gameId: '',
    myName: '',
  },
})
