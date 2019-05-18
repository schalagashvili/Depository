import React, { Component } from 'react'
import { Button } from '../../styles/mixins'
import { Wrapper, ButtonsWrapper, CalorieInfo } from './styles'
import moment from 'moment-timezone'
import colors from '../../styles/colors'
import profile from '../../assets/images/profile.png'

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <img
          src={profile}
          alt="profileImage"
          style={{
            width: 55,
            height: 55,
            borderRadius: 55,
            // border: '5px solid white',
            boxShadow: '0 1px 15px rgba(0, 0, 0, 0.1)'
          }}
        />
        <div
          style={{
            marginLeft: 10,
            color: 'grey',
            display: 'flex',
            marginRight: 6,
            cursor: 'pointer',
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: 6, backgroundColor: 'black', marginLeft: 4 }} />
          <div style={{ width: 6, height: 6, borderRadius: 6, backgroundColor: 'black', marginLeft: 4 }} />
          <div style={{ width: 6, height: 6, borderRadius: 6, backgroundColor: 'black', marginLeft: 4 }} />
        </div>
      </Wrapper>
    )
  }
}

export default Header
