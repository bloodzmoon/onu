import { useState } from 'react'
import { GameState } from '../models/game.model'

/**
 * Shorthand ...because im lazy
 */
export const useGame = () =>
  useState<GameState>({
    myId: 0,
    turn: 0,
    direction: 'cw',
    myCard: [],
    players: [],
  })
