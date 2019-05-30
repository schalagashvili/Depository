import React, { Component } from 'react'
import { Wrapper } from './styles'
import arrow from '../../assets/images/arrow.png'
import disabledArrow from '../../assets/images/disabledArrow.png'

class TableHeader extends Component {
  state = { page: 1, leftEnd: 1, rightEnd: 5 }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 900, fontSize: 25, padding: '20px 42px 10px' }}>Deposits</div>
          <div style={{ display: 'flex', fontSize: 14, margin: 20, marginTop: 30 }}>
            <div>
              {this.state.leftEnd} - {this.state.rightEnd} of {this.props.deposistsQuantity || this.props.total}
            </div>
            {this.state.page === 1 ? (
              <div>
                <img src={disabledArrow} style={{ width: 17, height: 17, marginLeft: 25 }} />
              </div>
            ) : (
              <div
                onClick={() => {
                  this.props.previous()
                  this.setState({
                    page: this.state.page - 1,
                    rightEnd: this.state.rightEnd - 5,
                    leftEnd: this.state.leftEnd - 5
                  })
                }}
              >
                <img src={arrow} style={{ width: 17, height: 17, marginLeft: 25, cursor: 'pointer' }} />
              </div>
            )}
            {this.props.total / this.props.page <= 5 ? (
              <div>
                <img
                  src={disabledArrow}
                  style={{ width: 17, height: 17, marginLeft: 25, transform: 'rotate(180deg)' }}
                />
              </div>
            ) : (
              <div
                onClick={() => {
                  this.props.next()
                  this.setState({
                    page: this.state.page + 1,
                    rightEnd: this.state.rightEnd + 5,
                    leftEnd: this.state.leftEnd + 5
                  })
                }}
              >
                <img
                  src={arrow}
                  style={{ width: 17, height: 17, marginLeft: 20, transform: 'rotate(180deg)', cursor: 'pointer' }}
                />
              </div>
            )}
          </div>
        </div>
        <Wrapper>
          <div style={{ flex: 1 }}>Bank Name</div>
          <div style={{ flex: 1.1 }}>Init. Amount</div>
          <div style={{ flex: 0.7 }}>Intereset Rate</div>
          <div style={{ flex: 0.7 }}>Tax %</div>
          <div style={{ flex: 1 }}>Start Date</div>
          <div style={{ flex: 1 }}>End Date</div>
          <div style={{ flex: 0, width: 44 }} />
        </Wrapper>
      </div>
    )
  }
}

export default TableHeader
