import { v4 as GenerateUUID } from 'uuid'
import WebSocket from 'ws'
import { JoinRoomPayload } from './messageTypes'

interface User {
  socket: WebSocket
  name: string
}

interface Room {
  id: string
  users: User[]
}

let ROOMS: Room[] = []

const get = (id: string) => ROOMS.find((room) => room.id === id)

const getAll = () => ROOMS

const create = (id?: string) => {
  const roomId = id || GenerateUUID()
  ROOMS.push({ id: roomId, users: [] })
  return ROOMS[ROOMS.length - 1]
}

const addUser = (socket: WebSocket, { player, gameId }: JoinRoomPayload) => {
  const room = get(gameId) || create(gameId)

  const user = room.users.find((u) => u.name === player)
  if (user)
    return socket.send(
      JSON.stringify({
        action: 'error',
        payload: 'This name has been taken by someone in this room!',
      })
    )

  room.users.push({ name: player, socket })
  console.log(`${player} has joined room ${gameId}`)
}

const removeUser = (socket: WebSocket) => {
  let user: User | undefined
  const room = ROOMS.find((r) => {
    user = r.users.find((u) => u.socket === socket)
    return user
  })
  if (!room || !user) return

  const index = room.users.indexOf(user)
  if (index !== -1) room.users.splice(index, 1)
  console.log(`${user.name} has left room ${room.id}`)
}

const broadcast = (
  socket: WebSocket,
  { msg, roomId }: { msg: string; roomId: string }
) => {
  const room = get(roomId)
  if (!room) return

  const data = { action: 'broadcast', payload: msg }
  room.users.forEach((user) => {
    if (user.socket !== socket) user.socket.send(JSON.stringify(data))
  })
}

export default {
  get,
  getAll,
  create,
  addUser,
  removeUser,
  broadcast,
}
