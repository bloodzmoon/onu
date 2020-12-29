import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from '../../hooks'
import { Button, Input } from '../../components'
import styles from './Home.module.css'

/**
 * This is the root route `/`
 * Player will have to enter their name
 * and GameID to proceed to the Game page
 */
export const Home = () => {
  const global = useGlobalState()
  const history = useHistory()
  const [step, setStep] = useState<boolean>(true)
  /**
   * true  : Enter Name
   * false : Enter Game ID
   */

  const setMyName = (e: ChangeEvent<HTMLInputElement>) =>
    global.setMyName(e.target.value)

  const setGameId = (e: ChangeEvent<HTMLInputElement>) =>
    global.setGameId(e.target.value)

  const confirmName = () => {
    if (global.myName.length === 0) return alert('Enter ya name!')
    setStep(false)
  }

  const enterGame = () => {
    if (global.gameId.length === 0) return alert('Enter game ID!!!')
    history.push('/game')
  }

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleClick()
  }

  const placeholder = step ? 'Your name' : 'Game ID'
  const value = step ? global.myName : global.gameId
  const handleChange = step ? setMyName : setGameId
  const handleClick = step ? confirmName : enterGame

  // Render HTML
  return (
    <div className={styles.container}>
      <header className={styles.header}>ONU!</header>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyPress={handleEnterKey}
        autoFocus
      />
      <br />
      <Button onClick={handleClick}>OK</Button>
      <br />
      {!step && 'just press F5 if ya wanna change name :P'}
    </div>
  )
}
