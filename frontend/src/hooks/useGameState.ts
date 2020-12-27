import { useCallback, useState } from 'react'
import { GameState } from '../models/game'

/**
 * Shorthand ...because im lazy
 */
export const useGameState = () => {
  const [game, setGame] = useState<GameState>({
    status: 'LOADING',
    myId: 0,
    turn: 0,
    direction: 'cw',
    myCard: [],
    players: [],
  })

  const setStatus = useCallback(
    (status: 'LOADING' | 'PLAYING') => {
      setGame((game) => ({ ...game, status }))
    },
    [setGame]
  )

  return { ...game, set: setGame, setStatus }
}
