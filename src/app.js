import React, { Fragment } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Auth, Logs, Users, Landing, Profile } from './pages'
import ProtectedRoute from './ProtectedRoute'
import { createBrowserHistory } from 'history'
import { Sidebar } from './components'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Switch>
      {/* <ProtectedRoute path="/logs/:userId?" component={Logs} /> */}
      <ProtectedRoute path="/users" component={Users} />
      <Route path="/signup" component={() => <Auth />} />
      <Route exact path="/" component={Landing} />
      <Fragment>
        <Route path="/dashboard/" component={() => <Sidebar />} />
        <Route path="/dashboard/logs/" component={Logs} />
        <Route path="/dashboard/profile" component={Profile} />
      </Fragment>
      {/* <Redirect from="/*" exact to="/signup" /> */}
    </Switch>
  </Router>
)

export default App
