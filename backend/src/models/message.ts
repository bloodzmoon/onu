import { Card } from './card'

/**
 * Outgoing message
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
    state: 'waiting' | 'playing'
    turn: number
    direction: 'cw' | 'ccw'
    players: {
      id: number
      name: string
      cardCount: number
    }[]
  }
}

export type OutMessage = InitMessage | UpdateMessage

/**
 * Incoming message
 */
interface JoinMessage {
  type: 'join'
  payload: {
    playerName: string
    gameId: string
  }
}

export type InMessage = JoinMessage
