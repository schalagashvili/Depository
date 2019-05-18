import React, { Component } from 'react'
import welcome from '../../assets/images/welcome.png'

class TableHeader extends Component {
  render() {
    return (
      <div
        style={{
          borderRadius: 20,
          backgroundColor: 'white',
          marginBottom: 40,
          padding: '0 40px',
          marginTop: 30,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 1px 25px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 35, padding: '30px 0' }}>Welcome Back Admin!</div>
        <img src={welcome} alt="welcome" style={{ height: 100, position: 'absolute', right: 0, bottom: 0 }} />
      </div>
    )
  }
}

export default TableHeader
