import React from 'react'
import { Header } from '../../pages/Logs/styles'
import { Link } from 'react-router-dom'
import { Button } from '../../styles/mixins'
import colors from '../../styles/colors'

export default class BaseHeader extends React.Component {
  onLogout() {
    this.props.onLogout()
  }

  render() {
    const { role } = this.props

    return (
      <Header>
        {/* {(role === 'admin' || role === 'manager') && (
          <div>
            {window.location.pathname === '/logs' ? (
              <Link to="/users">
                <Button color={colors.tomato}>Users</Button>
              </Link>
            ) : (
              <Button color={colors.tomato}>
                <Link to="/logs">Logs</Link>
              </Button>
            )}
          </div>
        )}
        <Button onClick={() => this.onLogout()} logout color={colors.pink}>
          Logout
        </Button> */}
      </Header>
    )
  }
}
