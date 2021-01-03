/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { useGameState, useGlobalState, useWebSocket } from 'Hooks'
import { ColorPicker, Deck, Gameover, Loader, Player } from 'Components'
import { Message } from 'Utils/messages'
import { PlayerData } from '@shared/game.model'
import { Card } from '@shared/card.model'
import styles from './Game.module.css'

const URL = 'ws://localhost:5000'
// const URL = 'wss://onu-uno.herokuapp.com/'

/**
 * This is the game route `/game`
 * Everything will happen here in this page
 * that's why this file has a lot of code <3
 */
export const Game = () => {
  const global = useGlobalState()
  const game = useGameState()
  const socket = useWebSocket(URL, game)

  const drawCard = useCallback(() => {
    socket.send(Message.play(global.gameId, game.myId, null))
    game.nextTurn()
  }, [global.gameId, game.myId, socket])

  const handlePlay = useCallback(
    (card: Card) => {
      game.playMyCard(card)
      if (card.type === 'W') game.setIsPickingColor(true)
      else playCard(card)
    },
    [game]
  )

  const pickColor = useCallback(
    (color: 'red' | 'green' | 'blue' | 'yellow') => {
      const card = { ...game.playedCard!, color }
      game.setPlayedCard(card)
      game.setIsPickingColor(false)
      playCard(card)
    },
    [game.playedCard]
  )

  const playCard = useCallback(
    (card: Card) => {
      socket.send(Message.play(global.gameId, game.myId, card))
      switch (card.content) {
        case 'Rev':
          game.changeDirection()
          game.nextTurn()
          break

        case 'Skip':
        case '+2':
        case '+4':
          game.nextTurn(2)
          break

        default:
          game.nextTurn()
      }
    },
    [game, global.gameId, socket]
  )

  const sortedPlayer = useMemo<PlayerData[]>(() => game.sortedPlayer(), [
    game.players,
  ])

  // Render HTML
  if (!global.gameId) return <Redirect to="/" />
  if (game.status === 'loading') return <Loader text="Connecting" />

  return (
    <>
      <div className={styles.container}>
        {game.status === 'waiting' && (
          <Loader
            text="Waiting for player"
            subtext={`GameID ${global.gameId}`}
          />
        )}
        {game.status === 'gameover' && <Gameover result={game.result} />}
        {game.isPickingColor && <ColorPicker onSelect={pickColor} />}
        <div className={styles.gameid}>Game ID {global.gameId}</div>
        <Deck
          lastestCard={game.playedCard}
          direction={game.direction}
          disabled={!game.isPlaying(game.myId)}
          drawCard={drawCard}
        />
        {sortedPlayer.map((p, i) => (
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
