import { Redirect } from 'react-router-dom'
import { useGameState, useGlobalState, useWebSocket } from '../../hooks'
import { Message } from '../../utils/messages'
import { ColorPicker, Deck, Gameover, Loader, Player } from '../../components'
import { InMessage } from '../../models/message'
import { Card } from '../../models/card'
import styles from './Game.module.css'

// const URL = 'ws://localhost:5000'
const URL = 'wss://onu-uno.herokuapp.com/'

/**
 * This is the game route `/game`
 * Everything will happen here in this page
 * that's why this file has a lot of code <3
 */
export const Game = () => {
  const global = useGlobalState()
  const game = useGameState()
  const socket = useWebSocket(URL, joinRoom, handleMessage)
  console.log('rerender')

  function joinRoom() {
    if (!socket) return
    const { myName, gameId } = global
    socket.send(Message.join(myName, gameId))
  }

  function drawCard() {
    socket.send(Message.play(global.gameId, game.myId, null))
    game.nextTurn()
  }

  function handlePlay(card: Card) {
    game.playMyCard(card)
    if (card.type === 'W') game.setIsPickingColor(true)
    else playCard(card)
  }

  function pickColor(color: 'red' | 'green' | 'blue' | 'yellow') {
    const card = game.playedCard
    card!.color = color
    game.setPlayedCard(card!)
    game.setIsPickingColor(false)
    playCard(card!)
  }

  function playCard(card: Card) {
    socket.send(Message.play(global.gameId, game.myId, card))
    switch (card.content) {
      case 'Rev':
        game.changeDirection()
        game.nextTurn()
        break

      case 'Skip':
      case '+2':
        game.nextTurn(2)
        break

      default:
        game.nextTurn()
    }
  }

  function handleMessage(this: WebSocket, message: MessageEvent<any>) {
    const msg: InMessage = JSON.parse(message.data)
    switch (msg.type) {
      case 'init':
        {
          const {
            turn,
            direction,
            playerId,
            players,
            cards,
            playedCard,
          } = msg.payload
          game.set((game) => ({
            ...game,
            turn,
            direction,
            players,
            myId: playerId,
            myCard: cards,
            status: 'waiting',
            playedCard,
          }))
        }
        break

      case 'update':
        {
          const { turn, direction, players, state } = msg.payload
          game.set((game) => ({
            ...game,
            turn,
            direction,
            players,
            status: state,
          }))
        }
        break

      case 'draw':
        {
          const { cards } = msg.payload
          game.addMyCard(cards)
        }
        break

      case 'card':
        {
          const { card } = msg.payload
          game.setPlayedCard(card)
        }
        break

      case 'gameover':
        const { result } = msg.payload
        game.over(result)
        break
    }
  }

  // Render HTML
  if (!global.gameId) return <Redirect to="/" />
  if (game.status === 'loading') return <Loader text="Connecting" />

  return (
    <>
      <div className={styles.container}>
        {game.status === 'waiting' && <Loader text="Waiting for player" />}
        {game.status === 'gameover' && <Gameover result={game.result} />}
        {game.isPickingColor && <ColorPicker onSelect={pickColor} />}
        <div className={styles.gameid}>Game ID {global.gameId}</div>
        <Deck
          lastestCard={game.playedCard!}
          direction={game.direction}
          disabled={!game.isPlaying(game.myId)}
          drawCard={drawCard}
        />
        {game.sortedPlayer().map((p, i) => (
          <Player
            key={`player${p.id}${i}`}
            player={p}
            position={i}
            myCards={p.id === game.myId ? game.myCard : null}
            disabled={!game.isPlaying(p.id)}
            playCard={handlePlay}
            isCardPlayable={game.isCardPlayable}
          />
        ))}
      </div>
    </>
  )
}
