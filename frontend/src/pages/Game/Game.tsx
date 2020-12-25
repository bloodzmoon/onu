import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { gameState } from '../../store'
import { joinMessage } from '../../helpers'
import { InMessage } from '../../models/message.model'
import styles from './Game.module.css'

const ENDPOINT = 'ws://localhost:5000'

export const Game = () => {
  const [game, setGame] = useRecoilState(gameState)
  const history = useHistory()
  if (!game.id) history.push('/')

  const socket = useRef<WebSocket | null>(null)

  useEffect(() => {
    socket.current = new WebSocket(ENDPOINT)
    socket.current.onopen = joinRoom
    socket.current.onmessage = handleMessage
    return () => socket.current?.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const joinRoom = () => {
    if (!socket.current) return history.push('/')
    socket.current.send(joinMessage(game.playerName, game.id))
  }

  function handleMessage(this: WebSocket, msg: MessageEvent<any>) {
    const { action, payload }: InMessage = JSON.parse(msg.data)
    switch (action) {
      case 'getDeck':
        setGame({ ...game, deck: payload, status: 'OK' })
        break

      default:
        break
    }
  }

  if (game.status === 'LOADING') return <div>Loading</div>

  return (
    <div className={styles.container}>
      <div className={styles.id}>Game ID {game.id}</div>
      <div className={styles.deck}>
        {game.deck.map((card) => (
          <p>{JSON.stringify(card)}</p>
        ))}
      </div>
      <div className={`${styles.player} ${styles.one}`}>1</div>
      <div className={`${styles.player} ${styles.two}`}>2</div>
      <div className={`${styles.player} ${styles.three}`}>3</div>
      <div className={`${styles.player} ${styles.four}`}>4</div>
    </div>
  )
}
