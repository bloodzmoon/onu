import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Home, Game } from './pages'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={Game} />
          <Route path="/" component={() => <div>Not found</div>} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
