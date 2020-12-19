import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home, Room } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/room" component={Room} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
