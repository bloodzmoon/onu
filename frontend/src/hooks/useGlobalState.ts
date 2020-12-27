import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { globalState } from '../store'

/**
 * Shorthand for using Recoil state
 * because im too lazy to typing!
 */
export const useGlobalState = () => {
  const [global, setGlobal] = useRecoilState(globalState)

  const setGameId = useCallback(
    (gameId: string) => {
      setGlobal((global) => ({ ...global, gameId }))
    },
    [setGlobal]
  )

  const setMyName = useCallback(
    (myName: string) => {
      setGlobal((global) => ({ ...global, myName }))
    },
    [setGlobal]
  )

  const reset = useCallback(() => {
    setGlobal({ gameId: '', myName: '' })
  }, [setGlobal])

  return { ...global, setGameId, setMyName, reset }
}
