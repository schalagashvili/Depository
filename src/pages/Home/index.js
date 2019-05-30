import React, { Component } from 'react'
import { Wrapper, InnerWrapper, Records } from './styles'
import { Deposit, TableHeader, WelcomeHeader, Brief } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getActiveDeposistsQuantity, getDeposits, addDeposit } from '../../redux/actions/deposit'
import { withCookies } from 'react-cookie'

class Logs extends Component {
  async componentDidMount() {
    this.props.getDeposits(this.props.cookies.get('cookie'))
    this.props.getActiveDeposistsQuantity(false, false, this.props.cookies.get('cookie'))
  }

  addDeposit = async () => {
    const deposit = {
      bankName: 'tralalala',
      initialAmoount: 123,
      interestRate: 3,
      tax: 5,
      startDate: new Date().getTime(),
      endDate: new Date().getTime()
    }
    await this.props.addDeposit(this.props.cookies.get('cookie'), deposit)
    this.props.getDeposits(this.props.cookies.get('cookie'))
  }

  renderDeposits() {
    return this.props.deposits.map((x, i) => {
      console.log(x.data())
      return <Deposit data={x.data()} key={x.data().bankName + x.data().createdAt + i} />
    })
  }

  render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <WelcomeHeader text="Welcome Back Admin!" />
          <Brief deposistsQuantity={this.props.deposistsQuantity} />
          <Records>
            <TableHeader
              next={() =>
                this.props.getDeposits(
                  this.props.cookies.get('cookie'),
                  this.props.deposits[this.props.deposits.length - 1]
                )
              }
              previous={() => this.props.getDeposits(this.props.cookies.get('cookie'), false, this.props.deposits[0])}
              deposistsQuantity={this.props.deposistsQuantity}
            />
            <div onClick={() => this.addDeposit()}>add deposit</div>
            {this.props.deposits && this.renderDeposits()}
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
    addDeposit: bindActionCreators(addDeposit, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    deposits: state.deposit.data && state.deposit.data.deposits,
    deposistsQuantity: state.deposit.data && state.deposit.data.depositsQuantity
  }
}

const LogsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs)
export default withCookies(LogsComponent)
