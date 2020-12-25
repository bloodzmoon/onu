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
interface InitMessage {
  action: 'init'
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
  action: 'update'
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
