import { v4 as GenerateUUID } from 'uuid'
import WebSocket from 'ws'

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

const addUser = (
  socket: WebSocket,
  { name, roomId }: { name: string; roomId: string }
) => {
  const room = get(roomId) || create(roomId)

  const user = room.users.find((u) => u.name === name)
  if (user) return

  room.users.push({ name, socket })
  console.log(`${name} has joined room ${roomId}`)
  console.log(room)
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
  broadcast,
}
