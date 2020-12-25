import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Button, Input } from '../../components'
import { globalState } from '../../store'
import styles from './Home.module.css'

export const Home = () => {
  type HomeState = 'ENTER_NAME' | 'ENTER_ROOM'
  const [state, setState] = useState<HomeState>('ENTER_NAME')

  const [global, setGlobal] = useRecoilState(globalState)
  const history = useHistory()

  const setPlayerName = (e: ChangeEvent<HTMLInputElement>) =>
    setGlobal({ ...global, myName: e.target.value })

  const setGameId = (e: ChangeEvent<HTMLInputElement>) =>
    setGlobal({ ...global, id: e.target.value })

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      switch (state) {
        case 'ENTER_NAME':
          confirmName()
          break

        case 'ENTER_ROOM':
          enterGame()
          break
      }
    }
  }

  const confirmName = () => {
    if (global.myName.length === 0) return alert('Enter ya name!')
    setState('ENTER_ROOM')
  }

  const enterGame = () => {
    if (global.id.length === 0) return alert('Enter game ID!!!')
    history.push('/game')
  }

  return (
    <div className={styles.container}>
      <h1>ONU!</h1>
      {state === 'ENTER_NAME' && (
        <>
          <Input
            placeholder="Your name"
            value={global.myName}
            onChange={setPlayerName}
            onKeyPress={handleEnterKey}
            autoComplete="no"
            autoFocus
          />
          <br />
          <Button onClick={confirmName}>OK</Button>
        </>
      )}
      {state === 'ENTER_ROOM' && (
        <>
          <Input
            placeholder="Room ID"
            value={global.id}
            onChange={setGameId}
            onKeyPress={handleEnterKey}
            autoComplete="no"
            autoFocus
          />
          <br />
          <Button onClick={enterGame}>Join</Button>
          <br />
          just press F5 if ya wanna change name :P
        </>
      )}
    </div>
  )
}
