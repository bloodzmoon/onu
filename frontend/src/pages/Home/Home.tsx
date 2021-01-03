import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from 'Hooks'
import { Button, Input } from 'Components'
import styles from './Home.module.css'

/**
 * This is the root route `/`
 * Player will have to enter their name
 * and GameID to proceed to the Game page
 */
export const Home = () => {
  const global = useGlobalState()
  const history = useHistory()
  const inputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<boolean>(true)
  /**
   * true  : Enter Name
   * false : Enter Game ID
   */

  useEffect(() => {
    if (global.gameId) history.push('/game')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global.gameId])

  const setName = () => {
    const name = inputRef.current!.value
    global.setMyName(name)
    if (name.length === 0) return alert('Enter ya name!')

    setStep(false)
    inputRef.current!.value = ''
  }

  const setGameId = () => {
    const gameId = inputRef.current!.value
    global.setGameId(gameId)
    if (gameId.length === 0) return alert('Enter game ID!!!')
  }

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleClick()
  }

  const placeholder = step ? 'Your name' : 'Game ID'
  const handleClick = step ? setName : setGameId

  // Render HTML
  return (
    <div className={styles.container}>
      <header className={styles.header}>ONU!</header>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        onKeyPress={handleEnterKey}
        autoComplete="no"
        autoCorrect="off"
        autoFocus
      />
      <br />
      <Button onClick={handleClick}>OK</Button>
      <br />
      {!step && 'just press F5 if ya wanna change name :P'}
    </div>
  )
}
