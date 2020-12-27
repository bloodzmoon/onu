import { useEffect, useRef, useCallback } from 'react'

/**
 * This custom hooks will make your life easier
 * it will auto attach handler function to your socket
 * and will let you send message without typing `current`
 */
export const useWebSocket = (
  url: string,
  handleOpen: () => void,
  handleMessage: (this: WebSocket, message: MessageEvent<any>) => void
) => {
  const socket = useRef<WebSocket | null>(null)

  useEffect(() => {
    socket.current = new WebSocket(url)
    socket.current.onopen = handleOpen
    socket.current.onmessage = handleMessage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const send = useCallback(
    (message: string) => {
      socket.current?.send(message)
    },
    [socket]
  )

  return { send }
}
