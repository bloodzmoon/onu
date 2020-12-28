import Game from '../core/game'
import { Card } from '../models/card'
import { OutMessage } from '../models/message'

/**
 * This message will be sent to whom
 * that join game for the first time
 */
const init = (game: Game, playerId: number, cards: Card[]) => {
  const message: OutMessage = {
    type: 'init',
    payload: {
      turn: game.turn,
      direction: game.direction,
      players: game.getPlayersData(),
      playerId,
      cards,
    },
  }
  return JSON.stringify(message)
}

/**
 * This message will be sent when there is
 * any common action
 * ex. join / leave / nextTurn / changeDir
 */
const update = (game: Game) => {
  const message: OutMessage = {
    type: 'update',
    payload: {
      state: game.state,
      turn: game.turn,
      direction: game.direction,
      players: game.getPlayersData(),
    },
  }
  return JSON.stringify(message)
}

const draw = (cards: Card[]) => {
  const message: OutMessage = {
    type: 'draw',
    payload: {
      cards,
    },
  }
  return JSON.stringify(message)
}

const card = (card: Card) => {
  const message: OutMessage = {
    type: 'card',
    payload: {
      card,
    },
  }
  return JSON.stringify(message)
}

export default {
  init,
  update,
  draw,
  card,
}
