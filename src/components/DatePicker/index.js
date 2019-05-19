import React, { Component } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './styles.css'
import { DateRangePicker } from 'react-dates'

class DatePicker extends Component {
  state = {
    focusedInput: null,
    startDate: null,
    endDate: null
  }

  render() {
    return (
      <div>
        {/* <DateRangePicker
          orientation={window.innerWidth < 768 ? 'vertical' : 'horizontal'}
          verticalHeight={window.innerWidth < 768 ? 350 : 400}
          numberOfMonths={1}
          // startDate={startDate}
          startDateId="your_unique_start_date_id"
          // endDate={endDate}
          endDateId="your_unique_end_date_id"
          // onDatesChange={({ startDate: start, endDate: end }) => changeDate(start, end)}
          focusedInput={this.state.focusedInput}
          // onFocusChange={focusedInputProp => this.setState({ focusedInput: focusedInputProp })}
        /> */}
        <DateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
        />
      </div>
    )
  }
}

export default DatePicker
