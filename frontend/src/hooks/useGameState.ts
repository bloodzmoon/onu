import { useCallback, useState } from 'react'
import { Card } from '../models/card'

/**
 * Shorthand ...because im lazy
 */
interface GameState {
  status: 'LOADING' | 'PLAYING'
  turn: number
  direction: 'cw' | 'ccw'
  players: {
    id: number
    name: string
    cardCount: number
  }[]
  myId: number
  myCard: Card[]
}

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
