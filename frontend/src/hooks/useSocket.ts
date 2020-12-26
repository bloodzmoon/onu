import { useRef, useEffect } from 'react'

/**
 * This hooks will make life easier!!
 * you can now use `socket` without `current` keyword
 * and this hooks also attach function to your socket!
 */
export const useSocket = (
  url: string,
  onOpen: () => void,
  onMessage: (this: WebSocket, message: MessageEvent<any>) => void
) => {
  const socket = useRef<WebSocket | null>(null)

  useEffect(() => {
    socket.current = new WebSocket(url)
    socket.current.onopen = onOpen
    socket.current.onmessage = onMessage
    return () => socket.current?.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return socket.current
}
