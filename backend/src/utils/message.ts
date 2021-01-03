import Game from '../core/game'
import { Card } from '@shared/card.model'
import { ServerMessage } from '@shared/message.model'

/**
 * This message will be sent to player
 * that join game for the first time
 */
const init = (game: Game, playerId: number, cards: Card[]) => {
  const message: ServerMessage = {
    type: 'init',
    payload: {
      turn: game.turn,
      direction: game.direction,
      players: game.getPlayersData(),
      playerId,
      cards,
      playedCard: game.getLastestCard(),
    },
  }
  return JSON.stringify(message)
}

/**
 * This message will be sent when there is
 * any game update
 * eg. join / leave / nextTurn / changeDir / draw / play
 */
const update = (game: Game) => {
  const message: ServerMessage = {
    type: 'update',
    payload: {
      status: game.status,
      turn: game.turn,
      direction: game.direction,
      players: game.getPlayersData(),
    },
  }
  return JSON.stringify(message)
}

/**
 * Player that draw cards will get this message
 */
const draw = (cards: Card[]) => {
  const message: ServerMessage = {
    type: 'draw',
    payload: {
      cards,
    },
  }
  return JSON.stringify(message)
}

/**
 * This message will be broadcast when someone
 * play a card
 */
const card = (card: Card) => {
  const message: ServerMessage = {
    type: 'card',
    payload: {
      card,
    },
  }
  return JSON.stringify(message)
}

/**
 * This message will be sent when the
 * game has ended
 */
const gameover = (game: Game) => {
  const message: ServerMessage = {
    type: 'gameover',
    payload: {
      result: game.getResult(),
    },
  }
  return JSON.stringify(message)
}

export default {
  init,
  update,
  draw,
  card,
  gameover,
}
