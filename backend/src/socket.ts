import { Server as WebSocket } from 'ws'
import Http from 'http'
import Rooms from './room'

import { Message } from './messageTypes'

const init = (server: Http.Server) => {
  const socket = new WebSocket({ server })

  socket.on('connection', (ws) => {
    ws.on('message', (msg: string) => {
      const { action, payload }: Message = JSON.parse(msg)

      switch (action) {
        case 'join':
          return Rooms.addUser(ws, payload)

        // case 'text':
        //   return Rooms.broadcast(ws, payload)

        default:
          return
      }
    })

    ws.on('close', () => {
      Rooms.removeUser(ws)
    })
  })
}

export default {
  init,
}
