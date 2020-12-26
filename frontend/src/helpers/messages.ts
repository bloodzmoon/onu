import { OutMessage } from '../models/message.model'

const join = (playerName: string, gameId: string) => {
  const msg: OutMessage = {
    action: 'join',
    payload: { playerName, gameId },
  }
  return JSON.stringify(msg)
}

export const Message = {
  join,
}
