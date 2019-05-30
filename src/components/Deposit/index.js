import React, { Component } from 'react'
import { Record } from './styles'

class Deposit extends Component {
  timeConverter = UNIX_timestamp => {
    const a = new Date(UNIX_timestamp)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const year = a.getFullYear()
    const month = months[a.getMonth()]
    const date = a.getDate()
    const time = date + ' ' + month + ' ' + year
    return time
  }

  render() {
    const { data } = this.props

    return (
      <Record>
        <div style={{ flex: 1.3 }}>{data.bankName}</div>
        <div style={{ flex: 1 }}>${data.initialAmount}</div>
        <div style={{ flex: 0.7 }}>{data.interestRate}</div>
        <div style={{ flex: 0.7 }}>{data.tax}</div>
        <div style={{ flex: 1 }}>{this.timeConverter(data.startDate)}</div>
        <div style={{ flex: 1 }}>{this.timeConverter(data.endDate)}</div>
      </Record>
    )
  }
}

export default Deposit
