import React, { Component } from 'react'
import Chart from 'react-google-charts'

class Header extends Component {
  render() {
    return (
      <div
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          marginBottom: 40,
          padding: 40,
          backgroundColor: 'white',
          height: 380,
          boxShadow: '0 1px 25px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Chart
          width={'100%'}
          height={300}
          chartType="Line"
          loader={<div style={{ textAlign: 'center', marginTop: 120 }}>Loading Chart</div>}
          data={[
            ['Day', 'Deposits', 'Total', 'Savings'],
            [1, 37.8, 80.8, 41.8],
            [2, 30.9, 69.5, 32.4],
            [3, 25.4, 57, 25.7],
            [4, 11.7, 18.8, 10.5],
            [5, 15.9, 17.6, 10.4],
            [6, 8.8, 13.6, 7.7],
            [7, 7.6, 12.3, 9.6],
            [8, 12.3, 29.2, 10.6],
            [9, 16.9, 42.9, 14.8],
            [10, 12.8, 30.9, 11.6],
            [11, 5.3, 7.9, 4.7],
            [12, 6.6, 8.4, 5.2],
            [13, 4.8, 6.3, 3.6],
            [14, 4.2, 6.2, 3.4]
          ]}
          options={{
            chart: {
              title: 'Deposit History',
              subtitle: 'in millions of dollars (USD)'
            }
          }}
        />
      </div>
    )
  }
}

export default Header
