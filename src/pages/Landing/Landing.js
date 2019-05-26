import React, { Component } from 'react'
import leftAbstraction from '../../assets/images/leftAbstraction.png'
import background3 from '../../assets/images/background3.png'
import LanguagToggle from '../../components/Toggle'

class LandingPage extends Component {
  render() {
    return (
      <div style={{ backgroundColor: 'white', minHeight: '100vh', width: '100%' }}>
        <div style={{ position: 'absolute', left: 105, top: 45 }}>
          <LanguagToggle />
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 40,
            right: 150,
            alignItems: 'center',
            fontWeight: 'bold'
          }}
        >
          <div
            style={{
              color: '#38ba8a',
              cursor: 'pointer'
            }}
          >
            Home
          </div>
          <a href="/signup">
            <div
              style={{
                borderRadius: 40,
                backgroundImage: 'linear-gradient(253deg, #3ba5b4 0,#38ba8a 0% )',
                boxShadow: '0 1px 14px rgba(0, 0, 0, 0.18)',
                padding: '10px 20px',
                color: 'white',
                marginLeft: 20,
                cursor: 'pointer'
              }}
            >
              Sign Up
            </div>
          </a>
        </div>
        <div style={{ position: 'absolute', left: 100, bottom: 370, zIndex: 1, width: 500 }}>
          <div style={{ fontFamily: 'NunitoExtraBold', fontSize: 55, color: '#38ba8a' }}>Investment</div>
          <div style={{ fontSize: 40, color: '#38ba8a', marginTop: -20 }}>Concept</div>
          <div style={{ marginTop: 20, color: 'grey', paddingLeft: 5 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s.
          </div>
          <a href="/signup">
            <div
              style={{
                borderRadius: 40,
                backgroundImage: 'linear-gradient(253deg, #3ba5b4 0, #38ba8a 0%)',
                padding: '10px 20px',
                color: 'white',
                width: 150,
                textAlign: 'center',
                marginTop: 60,
                boxShadow: '0 1px 14px rgba(0, 0, 0, 0.18)',
                cursor: 'pointer'
              }}
            >
              Get Started
            </div>
          </a>
        </div>
        <img src={background3} style={{ width: 1100, position: 'absolute', bottom: 60, right: 150 }} alt="rightAbst" />
      </div>
    )
  }
}

export default LandingPage
