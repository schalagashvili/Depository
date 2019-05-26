import React, { Fragment } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Auth, Report, Users, Landing, Profile, Calculator, Home } from './pages'
import ProtectedRoute from './ProtectedRoute'
import { createBrowserHistory } from 'history'
import { Sidebar } from './components'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Switch>
      {/* <ProtectedRoute path="/logs/:userId?" component={Logs} /> */}
      <Route path="/auth" component={() => <Auth />} />
      <Route exact path="/" component={Landing} />
      <Fragment>
        <Route path="/dashboard/" component={() => <Sidebar />} />
        <Route path="/dashboard/users" component={Users} />
        <Route path="/dashboard/home/" component={Home} />
        <Route path="/dashboard/report/" component={Report} />
        <Route path="/dashboard/profile" component={Profile} />
        <Route path="/dashboard/calculator" component={Calculator} />
      </Fragment>
      {/* <Redirect from="/*" exact to="/signup" /> */}
    </Switch>
  </Router>
)

export default App
