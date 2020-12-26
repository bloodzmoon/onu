import { Redirect, useHistory } from 'react-router-dom'
import { useGame, useGlobalState, useSocket } from '../../hooks'
import { Message } from '../../helpers'
import { Card } from '../../components'
import { InMessage } from '../../models/message.model'
import styles from './Game.module.css'

const URL = 'ws://localhost:5000'

export const Game = () => {
  const [global, setGlobal] = useGlobalState()
  const history = useHistory()

  const joinRoom = () => {
    if (!socket) return history.push('/')
    const { myName, id } = global
    socket.send(Message.join(myName, id))
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
          setGlobal((global) => ({ ...global, status: 'PLAYING' }))
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

  const socket = useSocket(URL, joinRoom, handleMessage)
  const [game, setGame] = useGame()

  // Render HTML
  if (!global.id) return <Redirect to="/" />
  if (global.status !== 'PLAYING') return <div>Loading</div>

  return (
    <>
      <div className={styles.gameid}>Game ID {global.id}</div>
      <div className={styles.container}>
        {game.players.map((p, i) => (
          <div key={p.id} className={`${styles.player} ${styles[`p${i}`]}`}>
            {p.id === game.myId ? (
              <>
                <span className={styles.name}>{global.myName}</span>
                {game.myCard.map((c, i) => (
                  <Card key={`${p.id}${i}`} data={c} canHover />
                ))}
              </>
            ) : (
              <>
                <span className={styles.name}>{p.name}</span>
                {Array(p.cardCount)
                  .fill('')
                  .map((_, i) => (
                    <Card
                      key={`${p.id}${i}`}
                      data={{ type: 'H', color: 'black', content: 'ONU' }}
                    />
                  ))}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
