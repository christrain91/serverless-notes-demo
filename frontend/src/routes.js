import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import NotFound from './containers/NotFound'
import Login from './containers/Login'

export default function Routes () {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}