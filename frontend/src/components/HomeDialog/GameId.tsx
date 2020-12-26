import { ChangeEvent, KeyboardEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalState } from '../../hooks'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

/**
 * Dialog in `Home` page that will let
 * player to enter game id that player
 * want to join / create
 */
export const GameId = () => {
  const [global, setGlobal] = useGlobalState()
  const history = useHistory()

  const setGameId = (e: ChangeEvent<HTMLInputElement>) =>
    setGlobal((global) => ({ ...global, id: e.target.value }))

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') enterGame()
  }

  const enterGame = () => {
    if (global.id.length === 0) return alert('Enter game ID!!!')
    setGlobal((global) => ({ ...global, status: 'LOADING' }))
    history.push('/game')
  }

  // Render HTML
  if (global.status !== 'ENTER_GAME_ID') return <></>

  return (
    <>
      <Input
        placeholder="Game ID"
        value={global.id}
        onChange={setGameId}
        onKeyPress={handleEnterKey}
        autoFocus
      />
      <br />
      <Button onClick={enterGame}>Join</Button>
      <br />
      just press F5 if ya wanna change name :P
    </>
  )
}
