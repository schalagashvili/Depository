import React, { Fragment } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Auth, Report, Users, Landing, Profile, Calculator, Home } from './pages'
import ProtectedRoute from './requireAuth'
import { createBrowserHistory } from 'history'
import { Sidebar } from './components'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path="/auth" component={() => <Auth />} />
      <Route exact path="/" component={Landing} />
      <Fragment>
        <ProtectedRoute path="/dashboard/" component={() => <Sidebar />} />
        <ProtectedRoute path="/dashboard/users" component={Users} />
        <ProtectedRoute path="/dashboard/home" component={Home} />
        <ProtectedRoute path="/dashboard/report/" component={Report} />
        <ProtectedRoute path="/dashboard/profile" component={Profile} />
        <ProtectedRoute path="/dashboard/calculator" component={Calculator} />
      </Fragment>
    </Switch>
  </Router>
)

export default App
