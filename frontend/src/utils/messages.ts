import { OutMessage } from '../models/message'

const join = (playerName: string, gameId: string) => {
  const msg: OutMessage = {
    type: 'join',
    payload: { playerName, gameId },
  }
  return JSON.stringify(msg)
}

export const Message = {
  join,
}
