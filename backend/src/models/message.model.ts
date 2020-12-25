interface JoinMessage {
  action: 'join'
  payload: JoinPayload
}

export interface JoinPayload {
  playerName: string
  gameId: string
}

export type Message = JoinMessage
