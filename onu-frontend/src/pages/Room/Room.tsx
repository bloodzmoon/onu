import { useEffect, useState } from 'react'
import { useQuery } from '../../hooks'

type RoomStatus = 'OK' | 'LOADING'

interface Message {
  action: 'join' | 'text'
  payload: any
}

const ENDPOINT = 'ws://localhost:5000'
const socket = new WebSocket(ENDPOINT)

export const Room = () => {
  const [roomStatus, setRoomStatus] = useState<RoomStatus>('LOADING')
  const [texts, setTexts] = useState<string[]>([])
  const { roomId, name } = useQuery()

  useEffect(() => {
    return () => socket.close()
  }, [])

  const joinRoom = () => {
    console.log('join!')

    const msg: Message = {
      action: 'join',
      payload: { roomId, name },
    }
    socket.send(JSON.stringify(msg))
    setRoomStatus('OK')
  }
  socket.onopen = joinRoom

  const send = () => {
    const msg: Message = {
      action: 'text',
      payload: { roomId, msg: 'Heelo!' },
    }
    console.log('clicked!')

    socket.send(JSON.stringify(msg))
  }

  function sockerHandler(this: WebSocket, msg: MessageEvent<any>) {
    const { action, payload } = JSON.parse(msg.data)
    switch (action) {
      case 'broadcast':
        return setTexts([...texts, payload])

      default:
        return
    }
  }
  socket.onmessage = sockerHandler

  if (roomStatus === 'LOADING') return <div>Loading</div>

  return (
    <div>
      Room {roomId}
      <button onClick={send}>Send</button>
      {texts.map((t) => (
        <div>{t}</div>
      ))}
    </div>
  )
}
