/**
 * Outgoing message
 */

/**
 * Incoming message
 */
interface JoinMessage {
  action: 'join'
  payload: JoinPayload
}

export interface JoinPayload {
  playerName: string
  gameId: string
}

export type InMessage = JoinMessage
