import { Card } from './card.model'

/**
 * Outgoing message
 */
interface JoinMessage {
  action: 'join'
  payload: {
    playerName: string
    gameId: string
  }
}

export type OutMessage = JoinMessage

/**
 * Incoming message
 */
interface GetDeckMessage {
  action: 'getDeck'
  payload: Card[]
}

export type InMessage = GetDeckMessage
