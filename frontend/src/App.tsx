import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Home, Game } from './pages'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
