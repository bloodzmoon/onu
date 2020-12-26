import { useRecoilState } from 'recoil'
import { globalState } from '../store'

/**
 * Shorthand for using Recoil state
 * because im too lazy to import!
 */
export const useGlobalState = () => useRecoilState(globalState)
