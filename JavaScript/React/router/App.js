import React from 'react'
import { Route, NavLink, Redirect, Switch } from 'react-router-dom'
import { PageOne, PageTwo } from './pages'

const App = ({ match }) => (
  <Switch>
    <Route path={`/`} exact render={() => (
      <Redirect to={`/pageOne`} />
    )} />
    <Route path={`/pageOne`} exact render={() => (
      <Redirect to={`/pageOne/SHOW_ALL`} />
    )} />
    <Route path={`/pageOne/:filter`} component={PageOne} />
    <Route path={`/pageTwo`} component={PageTwo} />
  </Switch>
)
export default App