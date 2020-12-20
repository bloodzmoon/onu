interface JoinRoomAction {
  action: 'join'
  payload: JoinRoomPayload
}

export interface JoinRoomPayload {
  player: string
  gameId: string
}

export type Message = JoinRoomAction
