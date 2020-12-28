import { useState } from 'react'
import { GameState, GameStatus } from '../models/game'
import { Card } from '../models/card'

/**
 * Shorthand ...because im lazy
 */
export const useGameState = () => {
  const [game, setGame] = useState<GameState>({
    status: 'loading',
    myId: 0,
    turn: 0,
    direction: 'cw',
    playedCards: [],
    myCard: [],
    players: [],
  })

  const setStatus = (status: GameStatus) => {
    setGame((game) => ({ ...game, status }))
  }

  /**
   * This will make `you` to be first index
   * of the player array
   */
  const sortedPlayer = () => {
    const sorted = [...game.players]
    while (sorted[0].id !== game.myId) {
      const player = sorted.shift()
      sorted.push(player!)
    }
    return sorted
  }

  const isPlaying = (playerId: number) => {
    return game.turn === playerId
  }

  const addMyCard = (cards: Card[]) => {
    setGame((game) => ({ ...game, myCard: [...game.myCard, ...cards] }))
  }

  const playMyCard = (card: Card) => {
    const index = game.myCard.indexOf(card)
    const played = game.myCard[index]
    setGame((game) => ({
      ...game,
      myCard: game.myCard.filter((c) => c !== played),
      playedCards: [...game.playedCards, played],
    }))
  }

  const addPlayedCard = (card: Card) => {
    setGame((game) => ({
      ...game,
      playedCards: [...game.playedCards, card],
    }))
  }

  const nextTurn = () => {
    const unit = game.direction === 'cw' ? +1 : -1
    let next = (game.turn + unit) % 4
    if (next === -1) next = 3
    setGame((game) => ({ ...game, turn: next }))
  }

  return {
    ...game,
    set: setGame,
    setStatus,
    sortedPlayer,
    isPlaying,
    addMyCard,
    playMyCard,
    addPlayedCard,
    nextTurn,
  }
}
