import React, { Component } from 'react'
import { Wrapper } from './styles'
import arrow from '../../assets/images/arrow.png'

class TableHeader extends Component {
  
  
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 900, fontSize: 25, padding: '20px 42px 10px' }}>Deposits</div>
          <div style={{ display: 'flex', fontSize: 14, margin: 20, marginTop: 30 }}>
            <div>1-28 of 28</div>
            <div>
              <img src={arrow} style={{ width: 17, height: 17, marginLeft: 25, cursor: 'pointer' }} />
            </div>
            <div>
              <img
                src={arrow}
                style={{ width: 17, height: 17, marginLeft: 20, transform: 'rotate(180deg)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
        <Wrapper>
          <div>Bank Name</div>
          <div>Account #</div>
          <div>Intereset %</div>
          <div>Tax %</div>
        </Wrapper>
      </div>
    )
  }
}

export default TableHeader
