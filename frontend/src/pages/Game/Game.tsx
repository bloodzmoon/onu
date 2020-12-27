import { Redirect } from 'react-router-dom'
import { useGameState, useGlobalState, useWebSocket } from '../../hooks'
import { Message } from '../../utils'
import { Card } from '../../components'
import { InMessage } from '../../models/message'
import styles from './Game.module.css'

const URL = 'ws://localhost:5000'

/**
 * This is the game route `/game`
 * Everything will happen here in this page
 * that's why this file has a lot of code <3
 */
export const Game = () => {
  const global = useGlobalState()
  const game = useGameState()
  const socket = useWebSocket(URL, joinRoom, handleMessage)

  function joinRoom() {
    if (!socket) return
    const { myName, gameId } = global
    socket.send(Message.join(myName, gameId))
  }

  function handleMessage(this: WebSocket, message: MessageEvent<any>) {
    const msg: InMessage = JSON.parse(message.data)
    switch (msg.type) {
      case 'init':
        {
          const { turn, direction, playerId, players, cards } = msg.payload
          game.set((game) => ({
            ...game,
            turn,
            direction,
            players,
            myId: playerId,
            myCard: cards,
            status: 'PLAYING',
          }))
        }
        break

      case 'update':
        {
          const { turn, direction, players } = msg.payload
          game.set((game) => ({
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

  // Render HTML
  if (!global.gameId) return <Redirect to="/" />
  if (game.status !== 'PLAYING') return <div>Loading</div>

  return (
    <>
      <div className={styles.gameid}>Game ID {global.gameId}</div>
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
