import React from 'react'
import { withCookies } from 'react-cookie'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ cookies, component: Component, ...rest }) => {
  const cookie = cookies.get('cookie')

  return (
    <Route {...rest} render={props => (cookie !== 'undefined' && cookie !== undefined ? <Component {...props} /> : <Redirect to="/auth" />)} />
  )
}

export default withCookies(PrivateRoute)
