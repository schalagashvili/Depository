import React, { Component } from 'react'
import moment from 'moment-timezone'
import { Wrapper, InnerWrapper, Records } from './styles'
import { Button } from '../../styles/mixins'
import {
  Filter,
  Record,
  Settings,
  AddRecord,
  Header,
  TableHeader,
  Sidebar,
  WelcomeHeader,
  Chart,
  Brief
} from '../../components'
import BaseHeader from '../../components/BaseHeader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addMealLog, editMealLog, getMealLogs, removeMealLog } from '../../redux/actions/deposit'
import { getUser, editUserCalories } from '../../redux/actions/user'

class Logs extends Component {
  constructor(props) {
    super(props)
    const timeNow = new Date().toTimeString().substr(0, 5)
    const dateNow = new Date().toISOString().substr(0, 10)
    const yesterday = moment()
      .subtract(1, 'days')
      .toISOString()
      .substr(0, 10)

    this.state = {
      expectedCalories: 0,
      totalCalories: 0,
      mealLogs: [
        { title: 'sandro' },
        { title: 'sandro' },
        { title: 'sandro' },
        { title: 'sandro' },
        { title: 'sandro' }
      ]
    }
  }

  renderRecords() {
    let { mealLogs, totalCalories, expectedCalories } = this.state

    if (mealLogs.length === 0) {
      return <div>No logs to show</div>
    }

    return mealLogs.map(log => {
      let { date, calories, title, _id } = log
      date = moment(date).format('YYYY-MM-DD HH:mm')
      return (
        <Record
          totalCalories={totalCalories}
          expectedCalories={expectedCalories}
          calories={calories}
          title={title}
          id={_id}
          editOpenHandler={this.editOpenHandler}
          handleChange={this.handleChange}
          onDelete={this.onDelete}
          date={date}
        />
      )
    })
  }

  render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <WelcomeHeader text="Welcome Back Admin!" />
          <Brief />
          <Records>
            <TableHeader />
            {this.renderRecords()}
          </Records>
        </InnerWrapper>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getUser: bindActionCreators(getUser, dispatch),
    // getMealLogs: bindActionCreators(getMealLogs, dispatch),
    // addMealLog: bindActionCreators(addMealLog, dispatch),
    // editMealLog: bindActionCreators(editMealLog, dispatch),
    // removeMealLog: bindActionCreators(removeMealLog, dispatch),
    // editUserCalories: bindActionCreators(editUserCalories, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    // mealLogs: state.record.data,
    // userInfo: state.user.data,
    // newMealLog: state
  }
}

const LogsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs)
export default LogsComponent
