import Express from 'express'
import Cors from 'cors'
import Http from 'http'
import Router from './router'
import WebSocket from './socket'

const PORT = process.env.PORT || 5000
const app = Express()
const server = Http.createServer(app)

app.use(Router)
app.use(Cors())
app.use(Express.json())
WebSocket.init(server)

server.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`)
})
