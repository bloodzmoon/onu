import { Card } from '../models/card'
import { OutMessage } from '../models/message'

const join = (playerName: string, gameId: string) => {
  const msg: OutMessage = {
    type: 'join',
    payload: { playerName, gameId },
  }
  return JSON.stringify(msg)
}

const play = (gameId: string, playerId: number, card: Card | null) => {
  const msg: OutMessage = {
    type: 'play',
    payload: { gameId, playerId, card },
  }
  return JSON.stringify(msg)
}

export const Message = {
  join,
  play,
}
