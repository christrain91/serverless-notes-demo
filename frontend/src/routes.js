import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import NotFound from './containers/NotFound'

export default function Routes () {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}