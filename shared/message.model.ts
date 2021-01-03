import { Card } from './card.model'
import { Direction, GameStatus, PlayerData } from './game.model'

/**
 * [ Server message ]
 * These messages will be sent from server side
 * to client side
 */

/**
 * Message that will be sent when someone has just
 * connected to the game for the first time
 */
type InitMessage = {
  type: 'init'
  payload: {
    turn: number
    direction: Direction
    players: PlayerData[]
    playerId: number
    cards: Card[]
    playedCard: Card
  }
}

/**
 * Message that will be sent when the game has updated
 * eg. someone joined/left the game, someone do some action
 */
type UpdateMessage = {
  type: 'update'
  payload: {
    status: GameStatus
    turn: number
    direction: Direction
    players: {
      id: number
      name: string
      cardCount: number
    }[]
  }
}

/**
 * Message that will be sent to client that
 * draw card
 */
type DrawMessage = {
  type: 'draw'
  payload: {
    cards: Card[]
  }
}

/**
 * Message that will be sent when other players
 * play a card
 */
type CardMessage = {
  type: 'card'
  payload: {
    card: Card
  }
}

/**
 * This will be sent when the game has ended
 */
type GameoverMessage = {
  type: 'gameover'
  payload: {
    result: string[]
  }
}

export type ServerMessage =
  | InitMessage
  | UpdateMessage
  | DrawMessage
  | CardMessage
  | GameoverMessage

/**
 * [ Client message ]
 * These messages will be sent from client side
 * to Server side
 */

/**
 * Send to server when joining
 */
interface JoinMessage {
  type: 'join'
  payload: {
    playerName: string
    gameId: string
  }
}

/**
 * Send to server when client want to
 * draw or play a card
 */
interface PlayMessage {
  type: 'play'
  payload: {
    gameId: string
    playerId: number
    card: Card | null
  }
}

export type ClientMessage = JoinMessage | PlayMessage
