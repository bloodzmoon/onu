import { ChangeEvent, KeyboardEvent } from 'react'
import { useGlobalState } from '../../hooks'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

/**
 * Dialog in `Home` page that will let
 * player to enter their name
 */
export const Name = () => {
  const [global, setGlobal] = useGlobalState()

  const setPlayerName = (e: ChangeEvent<HTMLInputElement>) =>
    setGlobal((global) => ({ ...global, myName: e.target.value }))

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') confirmName()
  }

  const confirmName = () => {
    if (global.myName.length === 0) return alert('Enter ya name!')
    setGlobal((global) => ({ ...global, status: 'ENTER_GAME_ID' }))
  }

  // Render HTML
  if (global.status !== 'ENTER_NAME') return <></>

  return (
    <>
      <Input
        placeholder="Your name"
        value={global.myName}
        onChange={setPlayerName}
        onKeyPress={handleEnterKey}
        autoFocus
      />
      <br />
      <Button onClick={confirmName}>OK</Button>
    </>
  )
}
