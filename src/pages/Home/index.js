import React, { Component } from 'react'
import { Wrapper, InnerWrapper, Records } from './styles'
import { Record, TableHeader, WelcomeHeader, Brief } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getActiveDeposistsQuantity, getDeposits, getNextDeposits } from '../../redux/actions/deposit'

class Logs extends Component {
  async componentDidMount() {
    await this.props.getDeposits()
    // await this.props.getActiveDeposistsQuantity()
  }

  renderRecords() {
    if (this.props.deposits) {
      return this.props.deposits.map((x, i) => {
        return <Record title={x.data().bankName} key={x.data().bankName + x.data().createdAt + i} />
      })
    }
  }

  render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <WelcomeHeader text="Welcome Back Admin!" />
          <Brief />
          <div onClick={() => this.props.getNextDeposits(this.props.deposits[this.props.deposits.length - 1])}>
            Next
          </div>
          {/* <div>{this.props.deposits}</div> */}
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
    getActiveDeposistsQuantity: bindActionCreators(getActiveDeposistsQuantity, dispatch),
    getDeposits: bindActionCreators(getDeposits, dispatch),
    getNextDeposits: bindActionCreators(getNextDeposits, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    deposits: state.deposit.data
  }
}

const LogsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs)
export default LogsComponent
