import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gameState, playerState } from '../../store'
import { joinGameAction } from '../../helpers'
import styles from './Game.module.css'

const ENDPOINT = 'ws://localhost:5000'

export const Game = () => {
  const [game, setGame] = useRecoilState(gameState)
  const history = useHistory()
  if (!game.id) history.push('/')

  const socket = useRef<WebSocket | null>(null)
  const player = useRecoilValue(playerState)

  useEffect(() => {
    socket.current = new WebSocket(ENDPOINT)
    socket.current.onopen = joinRoom
    socket.current.onmessage = handleMessage
    return () => socket.current?.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const joinRoom = () => {
    if (!socket.current) return history.push('/')
    socket.current.send(joinGameAction(player.name, game.id))
    setGame({ ...game, status: 'OK' })
  }

  function handleMessage(this: WebSocket, msg: MessageEvent<any>) {
    const { action, payload } = JSON.parse(msg.data)
    switch (action) {
      case 'error':
        history.push('/')
        alert(payload)
        return

      default:
        return
    }
  }

  if (game.status === 'LOADING') return <div>Loading</div>

  return (
    <div className={styles.container}>
      <div className={styles.id}>Game ID {game.id}</div>
      <div className={`${styles.player} ${styles.one}`}>1</div>
      <div className={`${styles.player} ${styles.two}`}>2</div>
      <div className={`${styles.player} ${styles.three}`}>3</div>
      <div className={`${styles.player} ${styles.four}`}>4</div>
    </div>
  )
}
