interface JoinMessage {
  action: 'join'
  payload: JoinPayload
}

export interface JoinPayload {
  playerName: string
  gameId: string
}

export type Message = JoinMessage

export const joinGameAction = (playerName: string, gameId: string) => {
  const msg: Message = {
    action: 'join',
    payload: { playerName, gameId },
  }
  return JSON.stringify(msg)
}
