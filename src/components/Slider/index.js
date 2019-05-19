import 'rc-slider/assets/index.css'
import React from 'react'
import Slider from 'rc-slider'
import { InputField } from '../'

class Slider2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue
    }
  }

  onSliderChange = value => {
    this.setState({ value })
  }

  unitCorrector = () => {
    if (this.props.unit === 'mo.' && this.state.value > 1) {
      return 'mos.'
    }
  }

  render() {
    return (
      <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', marginLeft: this.props.marginLeft || 80 }}>
        <div style={{ width: 370, marginRight: 80, paddingTop: 35 }}>
          <div style={{ marginBottom: 25, fontSize: 18 }}>{this.props.title}</div>
          <Slider
            value={this.state.value}
            onChange={this.onSliderChange}
            onAfterChange={this.onAfterChange}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            activeDotStyle={{ borderColor: 'orange' }}
            railStyle={{ backgroundColor: '#F3F3F4', height: 6 }}
            trackStyle={{ backgroundColor: '#38ba8a', height: 6 }}
            handleStyle={{
              borderColor: '#38ba8a',
              height: 20,
              width: 20,
              borderWidth: '3px',
              outline: 'none',
              marginLeft: -14,
              marginTop: -7
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <div style={{ color: 'silver', fontSize: 14 }}>{this.props.rangeMin}</div>
            <div style={{ color: 'silver', fontSize: 14 }}>{this.props.rangeMax}</div>
          </div>
        </div>
        <InputField
          disabled
          marginTop={45}
          width={150}
          value={this.state.value}
          unit={this.props.unit === 'mo.' && this.state.value > 1 ? 'mos.' : this.props.unit}
        />
      </div>
    )
  }
}

export default Slider2
