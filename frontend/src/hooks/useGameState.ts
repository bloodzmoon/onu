import { useCallback, useState } from 'react'
import { GameState, GameStatus } from '../models/game'

/**
 * Shorthand ...because im lazy
 */
export const useGameState = () => {
  const [game, setGame] = useState<GameState>({
    status: 'loading',
    myId: 0,
    turn: 0,
    direction: 'cw',
    myCard: [],
    players: [],
  })

  const setStatus = useCallback(
    (status: GameStatus) => {
      setGame((game) => ({ ...game, status }))
    },
    [setGame]
  )

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

  return { ...game, set: setGame, setStatus, sortedPlayer, isPlaying }
}
