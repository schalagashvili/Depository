import React, { Component } from 'react'
import wallet from '../../assets/images/wallet.png'
import calendar2 from '../../assets/images/calendar2.png'
import tax from '../../assets/images/tax.png'
import withdraw from '../../assets/images/withdraw.png'

class TableHeader extends Component {
  render() {
    return (
      <div
        style={{
          marginBottom: 40,
          marginTop: 30,
          display: 'flex'
        }}
      >
        <div
          style={{
            borderRadius: 20,
            height: 110,
            boxShadow: '0 1px 25px rgba(0, 0, 0, 0.05)',
            backgroundColor: 'white',
            flex: 1,
            display: 'flex'
          }}
        >
          <img src={wallet} style={{ width: 40, height: 40, marginLeft: 30, marginTop: 35 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 25 }}>
            <div style={{ fontWeight: 900, fontSize: 17, height: 23 }}>{this.props.deposistsQuantity}</div>
            <div style={{ fontSize: 15, color: 'grey' }}>Deposits</div>
          </div>
        </div>
        {/* <div
          style={{
            borderRadius: 20,
            height: 110,
            boxShadow: '0 1px 25px rgba(0, 0, 0, 0.05)',
            backgroundColor: 'white',
            flex: 1,
            marginLeft: 20,
            display: 'flex'
          }}
        >
          <img src={tax} style={{ width: 40, height: 40, marginLeft: 30, marginTop: 35 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 25 }}>
            <div style={{ fontWeight: 900, fontSize: 17 }}>18%</div>
            <div style={{ fontSize: 15, color: 'grey' }}>Tax</div>
          </div>
        </div> */}
        <div
          style={{
            borderRadius: 20,
            height: 110,
            boxShadow: '0 1px 25px rgba(0, 0, 0, 0.05)',
            backgroundColor: 'white',
            flex: 1,
            marginLeft: 20,
            display: 'flex'
          }}
        >
          <img src={withdraw} style={{ width: 40, height: 40, marginLeft: 30, marginTop: 35 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 25 }}>
            <div style={{ fontWeight: 900, fontSize: 17 }}>${Math.round(this.props.finalProfitOrLoss)}</div>
            <div style={{ fontSize: 15, color: 'grey' }}>Lose</div>
          </div>
        </div>
        {this.props.report && (
          <div
            style={{
              borderRadius: 20,
              height: 110,
              boxShadow: '0 1px 25px rgba(0, 0, 0, 0.05)',
              backgroundColor: 'white',
              flex: 1,
              marginLeft: 20,
              display: 'flex'
            }}
          >
            <img src={calendar2} style={{ width: 40, height: 40, marginLeft: 30, marginTop: 35 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 25 }}>
              <div style={{ fontWeight: 900, fontSize: 17 }}>14/24/2018</div>
              <div style={{ fontSize: 15, color: 'grey' }}>Period</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TableHeader
