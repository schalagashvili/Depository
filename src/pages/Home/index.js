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
import { addMealLog, editMealLog, getMealLogs, removeMealLog } from '../../redux/actions/record'
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

  async componentDidMount() {
    const token = this.props.token
    const userId = this.props.match.params.userId
    const { fromDate, toDate, fromTime, toTime, page } = this.state
    await this.props.getUser(userId, token)

    const user = this.props.userInfo.user
    this.setState({
      expectedCalories: 100,
      email: 'schal@gmail.com'
    })

    await this.props.getMealLogs(fromDate, toDate, fromTime, toTime, page, userId, token)

    let totalCalories = 0
    const mealLogs = this.props.mealLogs.logs
    if (mealLogs != null) {
      mealLogs.map(log => (totalCalories += log.calories))
    }
    this.setState({
      // mealLogs: mealLogs != null ? mealLogs.reverse() : [],
      totalCalories,
      logsCount: this.props.mealLogs.logsCount,
      page: this.state.page + 1
    })
  }

  loadMore = async page => {
    const { fromDate, toDate, fromTime, toTime } = this.state
    const token = this.props.token
    const userId = this.props.match.params.userId

    await this.props.getMealLogs(fromDate, toDate, fromTime, toTime, page, userId, token)
    let totalCalories = 0
    const mealLogs = this.props.mealLogs.logs
    if (mealLogs != null) {
      mealLogs.map(log => (totalCalories += log.calories))
    }
    const mergedLogs = this.state.mealLogs.concat(mealLogs)
    this.setState({
      mealLogs: mergedLogs,
      page: this.state.page + 1
    })
  }

  onSearch = async () => {
    const token = this.props.token
    const userId = this.props.match.params.userId
    const { fromDate, toDate, fromTime, toTime, page } = this.state
    await this.props.getMealLogs(fromDate, toDate, fromTime, toTime, page, userId, token)

    let totalCalories = 0
    const mealLogs = this.props.mealLogs.logs
    if (mealLogs != null) {
      mealLogs.map(log => (totalCalories += log.calories))
    }
    this.setState({
      mealLogs: mealLogs != null ? mealLogs.reverse() : [],
      totalCalories,
      logsCount: this.props.mealLogs.logsCount,
      page: 1
    })
  }

  editOpenHandler = (isAdd, id) => {
    if (isAdd) {
      const addDate = new Date().toISOString().substr(0, 10)
      const addTime = new Date().toTimeString().substr(0, 5)
      this.setState({ isAdd, addDate, addTime })
    } else {
      const editLog = this.state.mealLogs.filter(log => log._id === id)[0]
      const addDate = new Date(editLog.date).toISOString().substr(0, 10)
      const addTime = new Date(editLog.date).toTimeString().substr(0, 5)
      this.setState({
        editId: id,
        isAdd,
        addDate,
        addTime,
        addTitle: editLog.title,
        addCalories: editLog.calories
      })
    }
  }

  onExpectedCaloriesChange = calories => {
    if (calories < 0) {
      calories *= -1
    }
    this.setState({ expectedCalories: calories })
  }

  updateExpectedCalories = () => {
    const { expectedCalories } = this.state
    const token = this.props.token
    const userId = this.props.match.params.userId

    this.props.editUserCalories(userId, token, expectedCalories)
  }

  onAddCaloriesChange = e => {
    let calories = e.target.value
    if (calories < 0) {
      calories *= -1
    }
    this.setState({ addCalories: parseFloat(calories) })
  }

  onSave = async () => {
    let { addDate, addTime, addTitle, addCalories, isAdd, editId } = this.state
    const token = this.props.token

    if (addTitle === '' || addCalories === '') {
      return this.setState({ saveError: 1, saveErrorText: 'Please fill all fields' })
    }

    var currentDate = moment(this.state.today)
    var selectedDate = moment(this.state.addDate)
    const isFutureDate = currentDate.diff(selectedDate, 'days')
    if (isFutureDate < 0) {
      return this.setState({ saveError: 1, saveErrorText: 'Can`t add meal for future dates' })
    }

    this.setState({ addDate: '', addTime: '', addTitle: '', addCalories: '', saveError: null, addBottom: false })
    const datetime = moment(`${addDate} ${addTime}`)
    const userId = this.props.match.params.userId
    let mealLogs = this.state.mealLogs
    let totalCalories = 0
    if (isAdd) {
      await this.props.addMealLog(addTitle, addCalories, datetime, token, userId)

      mealLogs = 10
      if (mealLogs != null) {
        mealLogs.map(log => (totalCalories += log.calories))
      }
      const meals = mealLogs.slice(0, 9)
      this.setState({ mealLogs: meals, totalCalories })
    } else {
      await this.props.editMealLog(addTitle, addCalories, datetime, this.props.token, userId, editId)

      const editedLogIndex = mealLogs.findIndex(log => log._id === editId)
      if (editedLogIndex === -1) {
        return
      }
      mealLogs[editedLogIndex] = {
        _id: this.state.editId,
        title: addTitle,
        calories: addCalories,
        date: datetime
      }
      if (mealLogs != null) {
        mealLogs.map(log => (totalCalories += log.calories))
      }
      this.setState({ mealLogs, totalCalories })
    }
  }

  addRecord = () => {
    return (
      <AddRecord
        addBottom={this.state.addBottom}
        isAdd={this.state.isAdd}
        addTime={this.state.addTime}
        addDate={this.state.addDate}
        handleChange={this.handleChange}
        addTitle={this.state.addTitle}
        onAddCaloriesChange={this.onAddCaloriesChange}
        saveError={this.state.saveError}
        saveErrorText={this.state.saveErrorText}
        onSave={this.onSave}
        addCalories={this.state.addCalories}
      />
    )
  }

  handleChange = (state, value) => {
    this.setState({ [state]: value })
  }

  onDelete = id => {
    const userId = this.props.match.params.userId

    this.props.removeMealLog(userId, this.props.token, id)

    let mealLogs = this.state.mealLogs
    mealLogs = mealLogs.filter(log => log._id !== id)
    let totalCalories = 0
    if (mealLogs != null) {
      mealLogs.map(log => (totalCalories += log.calories))
    }
    this.setState({ mealLogs, totalCalories, logsCount: this.state.logsCount - 1 })
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
          <Chart />

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
    getUser: bindActionCreators(getUser, dispatch),
    getMealLogs: bindActionCreators(getMealLogs, dispatch),
    addMealLog: bindActionCreators(addMealLog, dispatch),
    editMealLog: bindActionCreators(editMealLog, dispatch),
    removeMealLog: bindActionCreators(removeMealLog, dispatch),
    editUserCalories: bindActionCreators(editUserCalories, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    mealLogs: state.record.data,
    userInfo: state.user.data,
    newMealLog: state
  }
}

const LogsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs)
export default LogsComponent
