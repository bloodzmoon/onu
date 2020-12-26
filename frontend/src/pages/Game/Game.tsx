import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Card } from '../../components'
import { globalState } from '../../store'
import { joinMessage } from '../../helpers'
import { GameState } from '../../models/game.model'
import { InMessage } from '../../models/message.model'
import styles from './Game.module.css'

const ENDPOINT = 'ws://localhost:5000'

export const Game = () => {
  type GameStatus = 'LOADING' | 'OK'
  const [state, setState] = useState<GameStatus>('LOADING')

  const global = useRecoilValue(globalState)
  const history = useHistory()
  if (!global.id) history.push('/')

  const socket = useRef<WebSocket | null>(null)
  const [game, setGame] = useState<GameState>({
    myId: 0,
    turn: 0,
    direction: 'cw',
    myCard: [],
    players: [],
  })

  useEffect(() => {
    socket.current = new WebSocket(ENDPOINT)
    socket.current.onopen = joinRoom
    socket.current.onmessage = handleMessage
    return () => socket.current?.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const joinRoom = () => {
    if (!socket.current) return history.push('/')
    socket.current.send(joinMessage(global.myName, global.id))
  }

  function handleMessage(this: WebSocket, message: MessageEvent<any>) {
    const msg: InMessage = JSON.parse(message.data)
    switch (msg.action) {
      case 'init':
        {
          const { turn, direction, playerId, players, cards } = msg.payload
          setGame((game) => ({
            ...game,
            turn,
            direction,
            players,
            myId: playerId,
            myCard: cards,
          }))
          setState('OK')
        }
        break

      case 'update':
        {
          const { turn, direction, players } = msg.payload
          setGame((game) => ({
            ...game,
            turn,
            direction,
            players,
          }))
        }
        break

      default:
        break
    }
  }

  if (state === 'LOADING') return <div>Loading</div>

  return (
    <div className={styles.container}>
      <div className={styles.id}>Game ID {global.id}</div>
      {game.players.map((p, i) => (
        <div key={p.id} className={`${styles.player} ${styles[`p${i}`]}`}>
          {p.id === game.myId ? (
            <>
              {global.myName}
              {game.myCard.map((c, i) => (
                <Card key={i} data={c} />
              ))}
            </>
          ) : (
            <>
              {p.name}
              {Array(p.cardCount)
                .fill('')
                .map((_, i) => (
                  <Card
                    key={i}
                    data={{ type: 'H', color: 'black', content: 'ONU' }}
                  />
                ))}
            </>
          )}
        </div>
      ))}
      <Card data={{ type: 'H', color: 'black', content: 'ONU' }} />
    </div>
  )
}
