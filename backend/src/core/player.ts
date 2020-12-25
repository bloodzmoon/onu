import WebSocket from 'ws'

class Player {
  readonly name: string
  readonly socket: WebSocket

  constructor(name: string, socket: WebSocket) {
    this.name = name
    this.socket = socket
  }

  show() {
    console.log(' ', this.name)
  }
}

export default Player
