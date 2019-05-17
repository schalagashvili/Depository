import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Auth, Logs, Users, Landing } from './pages'
import ProtectedRoute from './ProtectedRoute'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Switch>
      <ProtectedRoute path="/logs/:userId?" component={Logs} />
      <ProtectedRoute path="/users" component={Users} />
      <Route path="/signup" component={() => <Auth />} />
      <Route path="/" component={Landing} />
      {/* <Redirect from="/*" exact to="/signup" /> */}
    </Switch>
  </Router>
)

export default App
