import React, { Component } from 'react'
import { DatePicker, Slider, InputField } from '../'

class Filter extends Component {
  render() {
    return (
      <div style={{ padding: 40 }}>
        <div style={{ fontSize: 44, fontWeight: 700, marginBottom: -30, color: '#38ba8a' }}>Filter</div>
        <Slider
          initialValue={15}
          step={0.1}
          max={40}
          title="Tax"
          rangeMin="0%"
          rangeMax="40%"
          unit="%"
          min={0}
          marginLeft={1}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <InputField height={46} title="Bank Name" />
          <div style={{ marginLeft: 40, marginTop: 69 }}>
            <DatePicker />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 40 }}>
          <div
            onClick={this.props.closeFilter}
            style={{
              borderRadius: 40,
              backgroundImage: 'linear-gradient(253deg, #3ba5b4 0,#38ba8a 0% )',
              boxShadow: '0 1px 14px rgba(0, 0, 0, 0.18)',
              padding: '10px 20px',
              color: 'white',
              width: 140,
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            Save
          </div>
          <div onClick={this.props.closeFilter} style={{ marginLeft: 25, cursor: 'pointer' }}>
            Close
          </div>
        </div>
      </div>
    )
  }
}

export default Filter
