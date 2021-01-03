import { useRecoilState } from 'recoil'
import { globalState } from '../store'

/**
 * Shorthand for using Recoil state
 * because im too lazy to typing!
 */
export const useGlobalState = () => {
  const [global, setGlobal] = useRecoilState(globalState)

  const setGameId = (gameId: string) => {
    setGlobal((global) => ({ ...global, gameId }))
  }

  const setMyName = (myName: string) => {
    setGlobal((global) => ({ ...global, myName }))
  }

  const reset = () => {
    setGlobal({ gameId: '', myName: '' })
  }

  return { ...global, setGameId, setMyName, reset }
}
