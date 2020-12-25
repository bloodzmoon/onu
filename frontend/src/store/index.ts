import { atom } from 'recoil'

export const globalState = atom<{ id: string; myName: string }>({
  key: 'globalState',
  default: {
    id: '',
    myName: '',
  },
})
