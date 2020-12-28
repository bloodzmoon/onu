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

interface DrawMessage {
  type: 'draw'
  payload: {
    cards: Card[]
  }
}

interface CardMessage {
  type: 'card'
  payload: {
    card: Card
  }
}

export type OutMessage = InitMessage | UpdateMessage | DrawMessage | CardMessage

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

interface PlayMessage {
  type: 'play'
  payload: {
    gameId: string
    playerId: number
    card: Card | null
  }
}

export type InMessage = JoinMessage | PlayMessage
