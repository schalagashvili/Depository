import React, { Component } from 'react'
import { Wrapper, InnerWrapper, Records } from './styles'
import { Record, WelcomeHeader } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from '../../redux/actions/users'
import arrow from '../../assets/images/arrow.png'

class Logs extends Component {
  state = { users: [] }

  async componentDidMount() {
    await this.props.getUsers(3)
    // console.log(this.props.users[this.props.users.length - 1], 'usser')
    console.log(this.props.users && this.props.users.length, 'usser')
  }

  renderRecords() {
    return this.props.users.map(x => {
      console.log(x, 'xx')
      return <Record user title={x.email} key={x.email} role={x.role} id={x.userId} />
    })
  }

  render() {
    const lastUser = this.props.users && this.props.users[this.props.users.length - 1]
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
                  <div onClick={() => this.props.getUsers(3, lastUser)}>
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
                <div>Email</div>
                <div>Role</div>
                <div />
              </div>
            </div>
            {this.props.users && this.renderRecords()}
          </Records>
        </InnerWrapper>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: bindActionCreators(getUsers, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    users: state.users && state.users.data
  }
}

const LogsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs)
export default LogsComponent
