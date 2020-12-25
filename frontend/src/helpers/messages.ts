import { OutMessage } from '../models/message.model'

export const joinMessage = (playerName: string, gameId: string) => {
  const msg: OutMessage = {
    action: 'join',
    payload: { playerName, gameId },
  }
  return JSON.stringify(msg)
}
