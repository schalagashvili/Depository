import React, { Component } from 'react'
import settings from '../../assets/images/settings.png'
import home from '../../assets/images/home.png'
import logoutImg from '../../assets/images/logout.png'
import users from '../../assets/images/users.png'
import profile from '../../assets/images/profile.png'
import report from '../../assets/images/report.png'
import calculator from '../../assets/images/calculator.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout, getUser } from '../../redux/actions/user'
import { withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie'

class Sidebar extends Component {
  state = { selected: 'home' }

  async componentDidMount() {
    await this.props.getUser(this.props.cookies.get('cookie'))
    console.log(this.props.location.pathname)
    console.log(this.props.cookies.get('token'), 'tkk')

    console.log(this.props.user, 'ueeerrr')
  }

  logout = async () => {
    await this.props.logout()
    this.props.history.push('/auth')
    this.props.cookies.set('cookie', 'undefined')
  }

  selectHandler = category => {
    this.setState({ selected: category })
  }

  render() {
    console.log(this.props.cookies.get('cookie'), 'quuuq')
    const { selected } = this.state
    const path = this.props.location.pathname

    return (
      <div
        style={{
          minHeight: '100vh',
          height: '100%',
          width: 270,
          backgroundColor: 'white',
          position: 'fixed',
          left: 0,
          top: 0,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          boxShadow: '0 1px 15px rgba(0, 0, 0, 0.03)'
        }}
      >
        <div
          style={{ fontFamily: 'NunitoExtraBold', fontSize: 35, textAlign: 'center', marginTop: 70, color: '#38ba8a' }}
        >
          <img
            src={this.props.user ? this.props.user.sideImg : profile}
            alt="profileImage"
            style={{
              width: 110,
              height: 110,
              borderRadius: 110,
              // border: '5px solid white',
              boxShadow: '0 1px 25px rgba(0, 0, 0, 0.25)'
            }}
          />
          <div style={{ color: 'grey', fontSize: 14 }}>Hello {this.props.user && this.props.user.name}!</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30, marginLeft: 50 }}>
          <a href="/dashboard/home" style={{ color: 'black' }}>
            <div
              style={{
                marginTop: 35,
                alignItems: 'center',
                display: 'flex',
                borderRight: path === '/dashboard/home' && '4px solid #38ba8a',
                paddingTop: 5,
                paddingBottom: 5,
                cursor: 'pointer'
              }}
            >
              <img src={home} style={{ width: 30, marginRight: 15, height: 30 }} />
              Home
            </div>
          </a>
          <a href="/dashboard/users" style={{ color: 'black' }}>
            <div
              style={{
                marginTop: 35,
                alignItems: 'center',
                display: 'flex',
                borderRight: path === '/dashboard/users' && '4px solid #38ba8a',
                paddingTop: 5,
                paddingBottom: 5,
                cursor: 'pointer'
              }}
            >
              <img src={users} style={{ width: 30, marginRight: 15, height: 30 }} />
              Users
            </div>
          </a>
          <a href="/dashboard/profile" style={{ color: 'black' }}>
            <div
              style={{
                marginTop: 35,
                alignItems: 'center',
                display: 'flex',
                borderRight: path === '/dashboard/profile' && '4px solid #38ba8a',
                paddingTop: 5,
                paddingBottom: 5,
                cursor: 'pointer'
              }}
            >
              <img src={settings} style={{ width: 30, marginRight: 15, height: 30 }} />
              Profile
            </div>
          </a>
          <a href="/dashboard/calculator" style={{ color: 'black' }}>
            <div
              style={{
                marginTop: 35,
                alignItems: 'center',
                display: 'flex',
                borderRight: path === '/dashboard/calculator' && '4px solid #38ba8a',
                paddingTop: 5,
                paddingBottom: 5,
                cursor: 'pointer'
              }}
            >
              <img src={calculator} style={{ width: 30, marginRight: 15, height: 30 }} />
              Calculator
            </div>
          </a>
          <a href="/dashboard/report" style={{ color: 'black' }}>
            <div
              style={{
                marginTop: 35,
                alignItems: 'center',
                display: 'flex',
                paddingTop: 5,
                borderRight: path === '/dashboard/report' && '4px solid #38ba8a',
                paddingBottom: 5,
                cursor: 'pointer'
              }}
            >
              <img src={report} style={{ width: 30, marginRight: 15, height: 30 }} />
              Rev. Report
            </div>
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 50,
            alignItems: 'center',
            left: 55,
            cursor: 'pointer'
          }}
          onClick={this.logout}
        >
          <img src={logoutImg} style={{ width: 30, marginRight: 15, height: 30 }} />
          Logout
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(logout, dispatch),
    getUser: bindActionCreators(getUser, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.user && state.user.data
  }
}

const SidebarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
export default withCookies(withRouter(SidebarComponent))
