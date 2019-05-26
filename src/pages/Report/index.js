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
import filter from '../../assets/images/filter.png'
import { TimelineMax, TweenMax, Power4 } from 'gsap'

class Logs extends Component {
  constructor(props) {
    super(props)
    const timeNow = new Date().toTimeString().substr(0, 5)
    const dateNow = new Date().toISOString().substr(0, 10)
    const yesterday = moment()
      .subtract(1, 'days')
      .toISOString()
      .substr(0, 10)

    this.myRef = React.createRef()

    this.state = {
      expectedCalories: 0,
      totalCalories: 0,
      mealLogs: [
        { title: 'sandro' },
        { title: 'sandro' },
        { title: 'sandro' },
        { title: 'sandro' },
        { title: 'sandro' }
      ],
      fromDate: yesterday,
      toDate: dateNow,
      addBottom: false,
      settingsBottom: false,
      filterBottom: false,
      page: 1,
      today: dateNow,
      logsCount: 0,
      addTitle: '',
      addCalories: '',
      addDate: dateNow,
      addTime: timeNow,
      fromTime: timeNow,
      toTime: timeNow
    }
  }

  handleChange = (state, value) => {
    this.setState({ [state]: value })
  }

  closeFilter = () => {
    var tl = new TimelineMax()

    tl.to(this.myRef.current, 0.3, { top: 500 })
  }

  openFilter = () => {
    var tl = new TimelineMax()

    tl.to(this.myRef.current, 0.3, { top: 0 })
  }

  renderRecords() {
    let { mealLogs, totalCalories, expectedCalories } = this.state

    if (mealLogs.length === 0) {
      return <div>No logs to show</div>
    }

    return mealLogs.map(log => {
      let { date, calories, title, _id } = log
      date = moment(date).format('YYYY-MM-DD HH:mm')
      return <Record title={title} />
    })
  }

  render() {
    const { settingsBottom, logsCount, mealLogs, page } = this.state
    const dietBroken = this.state.totalCalories > this.state.expectedCalories
    return (
      <Wrapper>
        <BaseHeader role={this.props.role} onLogout={this.props.logout} />
        <InnerWrapper>
          <WelcomeHeader text="Revenue Report" />
          <Brief />

          <Records>
            <div
              style={{
                position: 'absolute',
                top: 500,
                left: 0,
                width: 1100,
                height: 475,
                backgroundColor: 'white',
                zIndex: 2
              }}
              ref={this.myRef}
            >
              <Filter closeFilter={this.closeFilter} />
            </div>
            <img
              src={filter}
              style={{ width: 25, height: 25, position: 'absolute', right: 200, top: 25, cursor: 'pointer', zIndex: 1 }}
              alt="filter"
              onClick={this.openFilter}
            />
            <TableHeader />
            {this.renderRecords()}
            {logsCount > mealLogs.length && (
              <Button onClick={() => this.loadMore(page)} color="lightGreen">
                More
              </Button>
            )}
          </Records>
          <Chart />
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
