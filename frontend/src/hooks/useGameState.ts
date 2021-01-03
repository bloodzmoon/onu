import { useCallback, useState } from 'react'
import { Card } from '@shared/card.model'
import { ClientGameStatus, GameState } from '@shared/game.model'

/**
 * Shorthand ...because im lazy
 */
export const useGameState = () => {
  const [game, setGame] = useState<GameState>({
    status: 'waiting',
    myId: 0,
    turn: 0,
    direction: 'cw',
    playedCard: null,
    myCard: [],
    players: [],
    isPickingColor: false,
    result: [],
  })

  const setStatus = (status: ClientGameStatus) => {
    setGame((game) => ({ ...game, status }))
  }

  const setIsPickingColor = (isPickingColor: boolean) => {
    setGame((game) => ({ ...game, isPickingColor }))
  }

  /**
   * This will make `you` to be first index
   * of the player array
   */
  const sortedPlayer = () => {
    if (!game.players.length) return []
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
    if (next < 0) next = 4 + next
    setGame((game) => ({ ...game, turn: next }))
    return next
  }

  const isCardPlayable = useCallback(
    (card: Card) => {
      if (
        card.color === 'black' ||
        card.color === game.playedCard?.color ||
        card.content === game.playedCard?.content
      ) {
        return true
      }
      return false
    },
    [game.playedCard]
  )

  const changeDirection = () => {
    const newDir = game.direction === 'cw' ? 'ccw' : 'cw'
    setGame((game) => ({
      ...game,
      direction: newDir,
    }))
  }

  const over = (result: string[]) => {
    setGame((game) => ({
      ...game,
      status: 'gameover',
      result,
    }))
  }

  return {
    ...game,
    set: setGame,
    setStatus,
    setIsPickingColor,
    sortedPlayer,
    isPlaying,
    addMyCard,
    playMyCard,
    setPlayedCard,
    nextTurn,
    isCardPlayable,
    changeDirection,
    over,
  }
}
