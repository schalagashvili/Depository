import React, { Component } from 'react'
import { DatePicker, Slider, InputField } from '../'

class Filter extends Component {
  render() {
    return (
      <div style={{ padding: 40 }}>
        <DatePicker />
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
        <InputField height={46} title="Bank Name" />
        <div>Save</div>
        <div>Close</div>
      </div>
    )
  }
}

export default Filter
