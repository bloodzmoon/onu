import Game from '../core/game'
import { Card } from '../models/card.model'
import { OutMessage } from '../models/message.model'

const init = (game: Game, playerId: number, cards: Card[]) => {
  const message: OutMessage = {
    action: 'init',
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

const update = (game: Game) => {
  const message: OutMessage = {
    action: 'update',
    payload: {
      turn: game.turn,
      direction: game.direction,
      players: game.getPlayersData(),
    },
  }
  return JSON.stringify(message)
}

export default {
  init,
  update,
}
