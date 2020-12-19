import Express, { Request, Response } from 'express'
import Cors from 'cors'

const app = Express()
app.use(Cors())

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!!')
})

app.listen(5000, () => {
  console.log('Server Started at Port, 5000')
})
