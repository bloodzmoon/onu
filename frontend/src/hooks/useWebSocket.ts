import { useEffect, useRef, useCallback } from 'react'
import { useGlobalState } from './useGlobalState'
import { useGameState } from './useGameState'
import { Message } from 'Utils/messages'
import { ServerMessage } from '@shared/message.model'

/**
 * This custom hooks will make your life easier
 * it will auto attach handler function to your socket
 * and will let you send message without typing `current`
 */
export const useWebSocket = (
  url: string,
  game: ReturnType<typeof useGameState>
) => {
  const socket = useRef<WebSocket | null>(null)
  const global = useGlobalState()

  useEffect(() => {
    socket.current = new WebSocket(url)
    socket.current.onopen = joinGame
    socket.current.onmessage = handleMessage

    return () => socket.current?.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const send = useCallback(
    (message: string) => {
      socket.current?.send(message)
    },
    [socket]
  )

  const joinGame = useCallback(() => {
    if (!socket) return
    const { myName, gameId } = global
    socket.current?.send(Message.join(myName, gameId))
  }, [socket, global])

  const handleMessage = useCallback(
    function (this: WebSocket, message: MessageEvent<any>) {
      const msg: ServerMessage = JSON.parse(message.data)
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
            game.set((game: any) => ({
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
            const { turn, direction, players, status } = msg.payload
            game.set((game) => ({
              ...game,
              turn,
              direction,
              players,
              status,
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
    },
    [game]
  )

  return { send }
}
