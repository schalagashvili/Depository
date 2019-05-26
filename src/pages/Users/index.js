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
import arrow from '../../assets/images/arrow.png'

class Logs extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

    return mealLogs.map(x => {
      return <Record title={x.title} />
    })
  }

  render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <WelcomeHeader text="Manage People" />
          <Records>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 900, fontSize: 25, padding: '20px 42px 10px' }}>Users</div>
                <div style={{ display: 'flex', fontSize: 14, margin: 20, marginTop: 30 }}>
                  <div>1-28 of 28</div>
                  <div>
                    <img src={arrow} style={{ width: 17, height: 17, marginLeft: 25, cursor: 'pointer' }} />
                  </div>
                  <div>
                    <img
                      src={arrow}
                      style={{ width: 17, height: 17, marginLeft: 20, transform: 'rotate(180deg)', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 12,
                  color: 'grey',
                  padding: '10px 37px 5px 45px',
                  borderBottom: '2px solid #eff3f9'
                }}
              >
                <div>Name</div>
                <div>Role</div>
                <div>Email</div>
              </div>
            </div>
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
  }
}

const mapStateToProps = state => {
  return {
    // mealLogs: state.record.data,
  }
}

const LogsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs)
export default LogsComponent
