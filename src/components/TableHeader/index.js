import React, { Component } from 'react'
import { Wrapper } from './styles'

class TableHeader extends Component {
  render() {
    return (
      <div>
        <div style={{ fontWeight: 900, fontSize: 25, padding: '20px 42px 10px' }}>Deposits</div>
        <Wrapper>
          <div>Bank Name</div>
          <div>Account #</div>
          <div>Amount</div>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Intereset %</div>
          <div>Tax %</div>
        </Wrapper>
      </div>
    )
  }
}

export default TableHeader
