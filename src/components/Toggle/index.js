import React, { Component } from 'react'
import usa from '../../assets/images/usa.png'
import germany from '../../assets/images/germany.png'
import { switchLanguage } from '../../redux/actions/language'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withCookies } from 'react-cookie'
import { TimelineMax } from 'gsap'

class Toggle extends Component {
  constructor(props) {
    super(props)

    this.state = { selectedLanguage: 'en' }

    this.enFlag = React.createRef()
    this.deFlag = React.createRef()
  }

  componentDidMount() {
    const tl2 = new TimelineMax()
    // this.setState({ selectedLanguage: this.props.cookies.get('language') })
    if (this.props.cookies.get('language') === 'en') {
      tl2
        .set(this.deFlag.current, { scale: 2 })
        .to(this.enFlag.current, 0.5, { scale: 2 })
        .to(this.deFlag.current, 0.5, { scale: 1 }, 0)
    } else {
      tl2
        .set(this.enFlag.current, { scale: 2 })
        .to(this.deFlag.current, 0.5, { scale: 2 })
        .to(this.enFlag.current, 0.5, { scale: 1 }, 0)
    }
  }

  changeLanguageHandler = language => {
    const { selectedLanguage } = this.state
    const tl = new TimelineMax()
    if (language === 'en' && selectedLanguage !== 'en') {
      tl.to(this.enFlag.current, 0.5, { scale: 2 }).to(this.deFlag.current, 0.5, { scale: 1 }, 0)
    } else if (language === 'de' && selectedLanguage !== 'de') {
      tl.to(this.deFlag.current, 0.5, { scale: 2 }).to(this.enFlag.current, 0.5, { scale: 1 }, 0)
    }
    this.setState({ selectedLanguage: language })
    this.props.switchLanguage(language)
    this.props.cookies.set('language', language)
    // localStorage.setItem('language', language)
  }

  render() {
    return (
      <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <div onClick={() => this.changeLanguageHandler('en')}>
          <img src={usa} style={{ width: 20, height: 20 }} alt="usa" ref={this.enFlag} />
        </div>
        <div onClick={() => this.changeLanguageHandler('de')}>
          <img src={germany} style={{ width: 20, height: 20, marginLeft: 20 }} alt="usa" ref={this.deFlag} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchLanguage: bindActionCreators(switchLanguage, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    language: state.language.data
  }
}

const ToggleLanguage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle)
export default withCookies(ToggleLanguage)
