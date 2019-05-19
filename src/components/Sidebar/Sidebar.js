import React, { Component } from 'react'
import settings from '../../assets/images/settings.png'
import home from '../../assets/images/home.png'
import logout from '../../assets/images/logout.png'
import users from '../../assets/images/users.png'
import profile from '../../assets/images/profile.png'
import report from '../../assets/images/report.png'
import calculator from '../../assets/images/calculator.png'

class Sidebar extends Component {
  render() {
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
            src={profile}
            alt="profileImage"
            style={{
              width: 110,
              height: 110,
              borderRadius: 110,
              // border: '5px solid white',
              boxShadow: '0 1px 25px rgba(0, 0, 0, 0.25)'
            }}
          />
          <div style={{ color: 'grey', fontSize: 14 }}>Hello Sandro!</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30, marginLeft: 50 }}>
          <div
            style={{
              marginTop: 35,
              alignItems: 'center',
              display: 'flex',
              borderRight: '4px solid #38ba8a',
              paddingTop: 5,
              paddingBottom: 5,
              cursor: 'pointer'
            }}
          >
            <img src={home} style={{ width: 30, marginRight: 15, height: 30 }} />
            Home
          </div>
          <div
            style={{
              marginTop: 35,
              alignItems: 'center',
              display: 'flex',
              paddingTop: 5,
              paddingBottom: 5,
              cursor: 'pointer'
            }}
          >
            <img src={users} style={{ width: 30, marginRight: 15, height: 30 }} />
            Users
          </div>
          <div
            style={{
              marginTop: 35,
              alignItems: 'center',
              display: 'flex',
              paddingTop: 5,
              paddingBottom: 5,
              cursor: 'pointer'
            }}
          >
            <img src={settings} style={{ width: 30, marginRight: 15, height: 30 }} />
            Profile
          </div>
          <div
            style={{
              marginTop: 35,
              alignItems: 'center',
              display: 'flex',
              paddingTop: 5,
              paddingBottom: 5,
              cursor: 'pointer'
            }}
          >
            <img src={calculator} style={{ width: 30, marginRight: 15, height: 30 }} />
            Calculator
          </div>
          <div
            style={{
              marginTop: 35,
              alignItems: 'center',
              display: 'flex',
              paddingTop: 5,
              paddingBottom: 5,
              cursor: 'pointer'
            }}
          >
            <img src={report} style={{ width: 30, marginRight: 15, height: 30 }} />
            Rev. Report
          </div>
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
        >
          <img src={logout} style={{ width: 30, marginRight: 15, height: 30 }} />
          Logout
        </div>
      </div>
    )
  }
}

export default Sidebar
