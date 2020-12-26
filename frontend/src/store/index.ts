import { atom } from 'recoil'

interface GlobalState {
  id: string
  myName: string
}

export const globalState = atom<GlobalState>({
  key: 'globalState',
  default: {
    id: '',
    myName: '',
  },
})
