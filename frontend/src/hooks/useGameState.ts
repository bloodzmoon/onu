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
    playedCard: null,
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
      playedCard: played,
    }))
  }

  const setPlayedCard = (card: Card) => {
    setGame((game) => ({
      ...game,
      playedCard: card,
    }))
  }

  const nextTurn = (n: number = 1) => {
    const unit = game.direction === 'cw' ? +n : -n
    let next = (game.turn + unit) % 4
    if (next < 0) next = 4 - next
    setGame((game) => ({ ...game, turn: next }))
  }

  const isCardPlayable = (card: Card) => {
    if (
      card.color === 'black' ||
      card.color === game.playedCard?.color ||
      card.content === game.playedCard?.content
    ) {
      return true
    }
    return false
  }

  return {
    ...game,
    set: setGame,
    setStatus,
    sortedPlayer,
    isPlaying,
    addMyCard,
    playMyCard,
    setPlayedCard,
    nextTurn,
    isCardPlayable,
  }
}
