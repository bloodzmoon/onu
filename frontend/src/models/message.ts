import { Card } from './card'

/**
 * Outgoing message
 */
interface JoinMessage {
  type: 'join'
  payload: {
    playerName: string
    gameId: string
  }
}

export type OutMessage = JoinMessage

/**
 * Incoming message
 */
interface InitMessage {
  type: 'init'
  payload: {
    turn: number
    direction: 'cw' | 'ccw'
    players: {
      id: number
      name: string
      cardCount: number
    }[]
    playerId: number
    cards: Card[]
  }
}

interface UpdateMessage {
  type: 'update'
  payload: {
    turn: number
    direction: 'cw' | 'ccw'
    players: {
      id: number
      name: string
      cardCount: number
    }[]
  }
}

export type InMessage = InitMessage | UpdateMessage
