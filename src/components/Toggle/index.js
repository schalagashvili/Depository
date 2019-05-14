import React, { Component } from 'react'
import usa from '../../assets/images/usa.png'
import spain from '../../assets/images/spain.png'

class Toggle extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={usa} style={{ width: 130, heigth: 130, borderRadius: 510 }} alt="us" />
        </div>
        <div>
          <img src={spain} style={{ width: 30, heigth: 30, filter: 'grayscale(100%)', borderRadius: 50 }} alt="es" />
        </div>
        Hello
      </div>
    )
  }
}

export default Toggle
