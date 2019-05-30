import React, { Component } from 'react'
import {
  Wrapper,
  LoginContainer,
  InputField,
  MainWrapper,
  UserWelcome,
  WelcomeTitle,
  WelcomeText,
  GuestWelcome,
  Error,
  Title,
  SidebarButton,
  Sidebar,
  Form,
  SocialMedia,
  Icon,
  Button,
  InputIcon,
  AlternativeJoin,
  SocialIcon
} from './styles'
import { signIn, signUp, twitterAuth, googleAuth, fbAuth, resetPassword } from '../../redux/actions/user'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'
import fb from '../../assets/images/facebook.png'
import user from '../../assets/images/user.png'
import mail from '../../assets/images/mail.png'
import locked from '../../assets/images/locked.png'
import twitter from '../../assets/images/twitter.png'
import googlePlus from '../../assets/images/google-plus.png'
import { ErrorBox, Toggle } from '../../components'
import { TimelineMax, TweenMax, Power4 } from 'gsap'
import { FormattedMessage } from 'react-intl'
import { createBrowserHistory } from 'history'
import { withCookies } from 'react-cookie'
import * as firebase from 'firebase/app'
import { withRouter } from 'react-router-dom'

const history = createBrowserHistory()
const tl = new TimelineMax()

class Login extends Component {
  constructor(props) {
    super(props)

    const { cookies } = props
    this.state = {
      // name: cookies.get('name') || 'Ben',
      name: '',
      email: '',
      password: '',
      passwordErrorText: '',
      emailErrorText: '',
      submitError: '',
      backendErrorText: '',
      signUp: true
    }

    this.myElement = null
    this.myRef = React.createRef()
    this.myRef2 = React.createRef()
    this.myRef3 = React.createRef()
    this.myRef4 = React.createRef()
    this.myRef5 = React.createRef()
    this.myRef6 = React.createRef()
    this.errorBox = React.createRef()
    this.name = React.createRef()
    this.email = React.createRef()
  }

  componentDidMount() {
    console.log(this.props.cookies.get('cookie'), 'kzzk')
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.cookies.get('cookie') !== undefined && nextProps.cookies.get('cookie') !== 'undefined') {
      // return nextProps.history.push('/')
    }
    return null
  }

  onEmailChange(e) {
    const email = e.target.value

    this.setState({ email })

    if (this.validateEmail(email)) {
      this.setState({ email, emailErrorText: '', emailError: 0 })
      if (this.state.passwordErrorText === '') {
        tl.to(this.errorBox.current, 0.6, { top: -150 })
      }
    }
  }

  onEmailBlur = () => {
    if (!this.validateEmail(this.state.email)) {
      tl.to(this.errorBox.current, 0.6, { top: 30, ease: Power4.easeOut })
      this.setState({
        emailErrorText: 'Please input valid email',
        emailError: 1,
        submitErrorText: ''
      })
    }
  }

  onPasswordChange(e) {
    const password = e.target.value
    this.setState({ password })

    if (password !== null || password.length >= 6) {
      if (this.state.emailErrorText === '') {
        tl.to(this.errorBox.current, 0.6, { top: -150 })
      }
      this.setState({ password, passwordErrorText: '', passwordError: 0 })
    }
  }

  onPasswordBlur = () => {
    const { password } = this.state

    if (password == null || password.length < 6) {
      tl.to(this.errorBox.current, 0.6, { top: 30, ease: Power4.easeOut })
      this.setState({
        passwordErrorText: 'Password length should be 6 or more',
        passwordError: 1,
        submitErrorText: ''
      })
    }
  }

  onSubmit = async () => {
    const { emailError, passwordError1, password, email, name, signUp } = this.state
    const role = 1

    if (!signUp) {
      return this.signInHandler()
    }

    if (password === '' || email === '' || (name === '' && signUp === true)) {
      tl.to(this.errorBox.current, 0.6, { top: 30, ease: Power4.easeOut })
      return this.setState({ submitError: 1, submitErrorText: 'Please fill in fields' })
    }

    if (emailError === 1 || passwordError1 === 1) {
      return
    }
    this.setState({ submitError: 0, submitErrorText: '' })

    await this.props.signUp(name, email, password, role)
    this.pushHandler()
  }

  googleAuth = async () => {
    await this.props.googleAuth()
    this.pushHandler()
  }

  twitterAuth = async () => {
    await this.props.twitterAuth()
    this.pushHandler()
  }

  fbAuth = async () => {
    await this.props.fbAuth()
    this.pushHandler()
  }

  signInHandler = async () => {
    const { email, password } = this.state
    if (password === '' || email === '') {
      tl.to(this.errorBox.current, 0.6, { top: 30, ease: Power4.easeOut })
      return this.setState({ submitError: 1, submitErrorText: 'Please fill in fields' })
    }

    this.setState({ submitError: 0, submitErrorText: '' })

    await this.props.signIn(email, password)
    this.pushHandler()
  }

  pushHandler = async () => {
    if (!isEmpty(this.props.user.errors)) {
      this.setState({ backendErrorText: this.props.user.errors })
      tl.to(this.errorBox.current, 0.6, { top: 30, ease: Power4.easeOut })
    } else {
      console.log(this.props.user.data.token, 'token')
      await this.props.cookies.set('token', this.props.user.data.token)
      await this.props.cookies.set('cookie', this.props.user.data.userId)
      // await this.props.cookies.set('cookie', this.props.user.data.userId)
      // console.log(this.props.cookies.get('cookie'), 'kflsdjl')
      this.props.history.push('/dashboard/home')
    }
  }

  buttonHandler = () => {
    if (this.state.passwordError) {
      tl.to(this.errorBox.current, 0, { top: -150 }, 0.3)
    }

    if (this.state.signUp) {
      TweenMax.to(this.myRef.current, 0.8, { right: 400 })
      setTimeout(() => {
        this.setState({
          signUp: false,
          password: '',
          passwordError: '',
          submitError: '',
          email: '',
          emailErrorText: '',
          passwordErrorText: ''
        })
      }, 300)
      tl.to(this.myRef2.current, 0.4, { width: 600 })
        .to(this.myRef5.current, 0.2, { width: 350 }, 0)
        .set(this.myRef5.current, { right: 120 })
        .to(this.myRef2.current, 0.4, { left: 600 }, '-=0.15')
        .to(this.myRef3.current, 0.4, { left: -250, opacity: 0 }, 0.7)
        .to(this.errorBox.current, 0, { top: -150 }, 0)
        .to(this.myRef2.current, 0.5, { left: 800 }, '-=0.15')
        .to(this.myRef5.current, 0.65, { width: 201 }, '-=0.5')
        .to(this.myRef4.current, 0.6, { right: 70, opacity: 1 }, '-=0.5')
    } else {
      TweenMax.to(this.myRef.current, 1, { right: 0 })
      setTimeout(() => {
        this.setState({
          signUp: true,
          password: '',
          passwordError: '',
          submitError: '',
          email: '',
          emailErrorText: '',
          passwordErrorText: ''
        })
      }, 330)
      tl.to(this.myRef2.current, 0.4, { left: 600 })
        .to(this.myRef4.current, 0.6, { right: -250, opacity: 0 }, '-=0.5')
        .to(this.myRef5.current, 0.2, { width: 350 }, 0)
        .set(this.myRef5.current, { right: 120 })
        .to(this.myRef2.current, 0.3, { left: 200 }, '-=0.2')
        .to(this.myRef2.current, 0.3, { left: 0 }, '-=0.15')
        .to(this.myRef5.current, 0.65, { width: 201 }, '-=0.5')
        .to(this.myRef3.current, 0.7, { left: 55, opacity: 1 }, 0.7)
        .to(this.errorBox.current, 0, { top: -150 }, 0)
        .to(this.myRef2.current, 0.5, { width: 400 }, '-=0.7')
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  render() {
    const { backendErrorText, passwordErrorText, submitErrorText, emailErrorText, signUp } = this.state

    return (
      <Wrapper>
        <div style={{ position: 'absolute', top: 60, right: 100 }}>
          <Toggle />
        </div>

        <MainWrapper>
          <UserWelcome innerRef={this.myRef3}>
            <WelcomeTitle>
              <FormattedMessage id="userWelcomeTitle" />
            </WelcomeTitle>
            <WelcomeText>
              <FormattedMessage id="userWelcomeText" />
            </WelcomeText>
          </UserWelcome>
          <GuestWelcome innerRef={this.myRef4}>
            <WelcomeTitle>
              <FormattedMessage id="guestWelcomeTitle" />
            </WelcomeTitle>
            <WelcomeText>
              <FormattedMessage id="guestWelcomeText" />
            </WelcomeText>
          </GuestWelcome>
          <Sidebar innerRef={this.myRef2}>
            <LoginContainer innerRef={this.myRef6}>
              <SidebarButton innerRef={this.myRef5} onClick={this.buttonHandler}>
                {signUp ? <FormattedMessage id="signIn" /> : <FormattedMessage id="signUp" />}
              </SidebarButton>
            </LoginContainer>
          </Sidebar>
          <Form innerRef={this.myRef}>
            <Error innerRef={this.errorBox}>
              <ErrorBox
                passwordError={passwordErrorText}
                emailError={emailErrorText}
                submitError={submitErrorText}
                backendError={backendErrorText}
              />
            </Error>
            <Title>{signUp ? <FormattedMessage id="createAccount" /> : <FormattedMessage id="loginTitle" />}</Title>
            <SocialMedia>
              <SocialIcon alt="fb" src={fb} onClick={this.fbAuth} />
              <SocialIcon alt="googlePlus" src={googlePlus} onClick={this.googleAuth} />
              <SocialIcon alt="twitter" src={twitter} onClick={this.twitterAuth} />
            </SocialMedia>
            <AlternativeJoin>
              {signUp ? <FormattedMessage id="registrationLabel" /> : <FormattedMessage id="loginLabel" />}
            </AlternativeJoin>
            {signUp && (
              <Icon>
                <FormattedMessage id="name">
                  {placeholder => (
                    <InputField
                      type="text"
                      placeholder={placeholder}
                      innerRef={this.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  )}
                </FormattedMessage>
                <InputIcon alt="user" src={user} />
              </Icon>
            )}
            <Icon>
              <FormattedMessage id="email">
                {placeholder => (
                  <InputField
                    onChange={e => this.onEmailChange(e)}
                    onBlur={this.onEmailBlur}
                    type="email"
                    value={this.state.email}
                    placeholder={placeholder}
                    borderColor={emailErrorText !== '' && '#e01d5a'}
                    innerRef={el => (this.email = el)}
                  />
                )}
              </FormattedMessage>
              <InputIcon alt="mail" src={mail} />
            </Icon>
            <Icon>
              <FormattedMessage id="password">
                {placeholder => (
                  <InputField
                    onChange={e => this.onPasswordChange(e)}
                    type="password"
                    onBlur={this.onPasswordBlur}
                    value={this.state.password}
                    placeholder={placeholder}
                    borderColor={passwordErrorText !== '' && '#e01d5a'}
                  />
                )}
              </FormattedMessage>

              <InputIcon alt="locked" src={locked} />
            </Icon>
            <div onClick={() => this.props.resetPassword()}>reset password</div>
            <Button onClick={this.onSubmit}>
              {signUp ? <FormattedMessage id="signUp" /> : <FormattedMessage id="signIn" />}
            </Button>
          </Form>
        </MainWrapper>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    signUp: bindActionCreators(signUp, dispatch),
    fbAuth: bindActionCreators(fbAuth, dispatch),
    googleAuth: bindActionCreators(googleAuth, dispatch),
    resetPassword: bindActionCreators(resetPassword, dispatch),
    twitterAuth: bindActionCreators(twitterAuth, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const LoginComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
export default withCookies(withRouter(LoginComponent))
