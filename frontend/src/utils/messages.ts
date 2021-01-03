import { Card } from '@shared/card.model'
import { ClientMessage } from '@shared/message.model'

const join = (playerName: string, gameId: string) => {
  const msg: ClientMessage = {
    type: 'join',
    payload: { playerName, gameId },
  }
  return JSON.stringify(msg)
}

const play = (gameId: string, playerId: number, card: Card | null) => {
  const msg: ClientMessage = {
    type: 'play',
    payload: { gameId, playerId, card },
  }
  return JSON.stringify(msg)
}

export const Message = {
  join,
  play,
}
