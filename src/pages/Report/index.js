import React, { Component } from 'react'
import { Wrapper, InnerWrapper, Records } from './styles'
import { Filter, Deposit, TableHeader, WelcomeHeader, Chart, Brief } from '../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import filter from '../../assets/images/filter.png'
import { getDeposits } from '../../redux/actions/deposit'
import { TimelineMax } from 'gsap'
import { CSVLink } from 'react-csv'
import { withCookies } from 'react-cookie'

const headers = [
  { label: 'Bank Name', key: 'bankName' },
  { label: 'Initial Aomunt', key: 'initialAmount' },
  { label: 'Interest Rate', key: 'interestRate' },
  { label: 'Tax', key: 'tax' },
  { label: 'Start Date', key: 'startDate' },
  { label: 'End Date', key: 'endDate' }
]

class Logs extends Component {
  state = { finalProfitOrLoss: 0, results: [], showing: [], page: 1 }

  componentDidMount() {
    fetch('https://us-central1-depostore-c9fee.cloudfunctions.net/generateRevenueReport', {
      body: JSON.stringify({
        idToken: this.props.cookies.get('token'),
        from: new Date('2019-01-01').getTime(),
        to: new Date().getTime()
      }),
      method: 'post'
    }).then(response => {
      const reader = response.body.getReader()
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close()
                return
              }
              controller.enqueue(value)
              push()
            })
          }
          push()
        }
      })

      const a = new Response(stream)

      a.json().then(res =>
        this.setState({
          finalProfitOrLoss: res.finalProfitOrLoss,
          results: res.results,
          showing: res.results.slice(0, 5)
        })
      )
    })
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
    return this.state.showing.map((x, i) => {
      console.log(x.startDate)
      return <Deposit data={x} key={x.bankName + x.createdAt + i} />
    })
  }

  previous = () => {
    this.setState({
      page: this.state.page - 1,
      showing: this.state.results.slice((this.state.page - 2) * 5, (this.state.page - 2) * 5 + 5)
    })
    console.log((this.state.page - 2) * 5, (this.state.page - 2) * 5 + 5)
  }

  next = () => {
    this.setState({
      page: this.state.page + 1,
      showing: this.state.results.slice(this.state.page * 5, this.state.page * 5 + 5)
    })
    console.log(this.state.page * 5, this.state.page * 5 + 5)
  }

  render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <WelcomeHeader text="Revenue Report" />
          <Brief
            report
            deposistsQuantity={this.state.results.length}
            finalProfitOrLoss={this.state.finalProfitOrLoss}
          />

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
            <TableHeader
              next={this.next}
              previous={this.previous}
              total={this.state.results.length}
              page={this.state.page}
            />
            <div style={{ position: 'absolute', top: 25, right: 500 }}>
              <CSVLink
                data={this.state.results}
                headers={headers}
                filename={`revenue_report`}
                style={{ color: 'blue' }}
              >
                Export Report as CSV
              </CSVLink>
            </div>
            <div onClick={() => this.props.getDeposits(this.props.cookies.get('cookie'), false, false, true)}>
              filteeeeer
            </div>
            {this.renderRecords()}
          </Records>
          <Chart />
        </InnerWrapper>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDeposits: bindActionCreators(getDeposits, dispatch)
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
export default withCookies(LogsComponent)
