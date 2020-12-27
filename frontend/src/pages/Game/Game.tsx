import { Redirect } from 'react-router-dom'
import { useGameState, useGlobalState, useWebSocket } from '../../hooks'
import { Message } from '../../utils'
import { Deck, Player } from '../../components'
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

  const sortPlayers = () => {
    const sorted = [...game.players]
    while (sorted[0].id !== game.myId) {
      const player = sorted.shift()
      sorted.push(player!)
    }
    return sorted
  }

  // Render HTML
  if (!global.gameId) return <Redirect to="/" />
  if (game.status !== 'PLAYING') return <div>Loading</div>

  return (
    <>
      <div className={styles.container}>
        <div className={styles.gameid}>Game ID {global.gameId}</div>
        <Deck direction={game.direction} />
        {sortPlayers().map((p, i) => (
          <Player
            key={`player${p.id}${i}`}
            player={p}
            position={i}
            myCards={p.id === game.myId ? game.myCard : null}
          />
        ))}
      </div>
    </>
  )
}
