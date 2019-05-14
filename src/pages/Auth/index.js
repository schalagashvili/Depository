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
import { userLogin } from '../../redux/actions/user'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import fb from '../../assets/images/facebook.png'
import user from '../../assets/images/user.png'
import mail from '../../assets/images/mail.png'
import locked from '../../assets/images/locked.png'
import twitter from '../../assets/images/twitter.png'
import googlePlus from '../../assets/images/google-plus.png'
import { ErrorBox } from '../../components'
import { TimelineMax, TweenMax, Power4 } from 'gsap'
// import { FormattedMessage } from 'react-intl'
import { createBrowserHistory } from 'history'
import { withCookies } from 'react-cookie'

const history = createBrowserHistory()

class Login extends Component {
  constructor(props) {
    super(props)

    const { cookies } = props
    this.state = {
      name: cookies.get('name') || 'Ben',
      email: '',
      password: '',
      passwordErrorText: '',
      emailErrorText: '',
      submitError: '',
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

  // componentDidMount() {
  //   console.log(this.state.name)
  //   const { cookies } = this.props

  //   return cookies.set('name', 'hello world', { path: '/' })
  // }

  onEmailChange(e) {
    const email = e.target.value
    this.setState({ email })

    if (!this.validateEmail(email)) {
      this.setState({
        emailErrorText: '* Please input valid email',
        emailError: 1,
        submitErrorText: ''
      })
    } else {
      this.setState({ email, emailErrorText: '', emailError: 0 })
    }
  }

  onPasswordChange(e) {
    const password = e.target.value
    var tl = new TimelineMax()
    this.setState({ password })

    if (password == null || password.length < 6) {
      tl.to(this.errorBox.current, 0.6, { top: 30, ease: Power4.easeOut })
      this.setState({
        passwordErrorText: '* Password length should be 6 or more',
        passwordError: 1,
        submitErrorText: ''
      })
    } else {
      tl.to(this.errorBox.current, 0.6, { top: -150 })

      this.setState({ password, passwordErrorText: '', passwordError: 0 })
    }
  }

  async onSubmit(login) {
    const { emailError, passwordError1, password, email } = this.state

    if (password === '' || email === '') {
      return this.setState({
        submitError: 1,
        submitErrorText: '* Please fill in fields'
      })
    }

    if (emailError === 1 || passwordError1 === 1) {
      return
    }
    this.setState({ submitError: 0, submitErrorText: '' })
    const outerThis = this

    await this.props.userLogin(email, password)
    const user = this.props.loggedUser

    if (!isEmpty(user)) {
      const token = user.token
      const role = user.role
      const email = user.email
      login(role, token, email)
    } else {
      const errorStatus = this.props.errors.status

      outerThis.setState({
        submitError: 1,
        submitErrorText: errorStatus === 401 ? '* Username and password dont match!' : '* Server error occurred...'
      })
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  buttonHandler = () => {
    var tl = new TimelineMax()
    var tl2 = new TimelineMax()
    if (this.state.passwordError) {
      tl2.to(this.errorBox.current, 0, { top: -150 }, 0.3)
    }

    if (this.state.signUp) {
      history.push({ pathname: '/signin' })
      TweenMax.to(this.myRef.current, 0.8, { right: 400 })
      setTimeout(() => {
        this.setState({ signUp: false, password: '', passwordError: '', submitError: '', email: '' })
      }, 300)
      tl.to(this.myRef2.current, 0.4, { width: 600 })
        .to(this.myRef5.current, 0.2, { width: 350 }, 0)
        .set(this.myRef5.current, { right: 120 })
        .to(this.myRef2.current, 0.4, { left: 600 }, '-=0.15')
        .to(this.myRef3.current, 0.4, { left: -250, opacity: 0 }, 0)
        .to(this.myRef2.current, 0.5, { left: 800 }, '-=0.15')
        .to(this.myRef5.current, 0.65, { width: 201 }, '-=0.5')
        .to(this.myRef4.current, 0.6, { right: 70, opacity: 1 }, '-=0.5')
    } else {
      history.push({ pathname: '/signin' })
      TweenMax.to(this.myRef.current, 1, { right: 0 })
      setTimeout(() => {
        this.setState({ signUp: true, password: '', passwordError: '', submitError: '', email: '' })
      }, 330)
      tl.to(this.myRef2.current, 0.4, { left: 600 })
        .to(this.myRef4.current, 0.6, { right: -250, opacity: 0 }, '-=0.5')
        .to(this.myRef5.current, 0.2, { width: 350 }, 0)
        .set(this.myRef5.current, { right: 120 })
        .to(this.myRef2.current, 0.3, { left: 200 }, '-=0.2')
        .to(this.myRef2.current, 0.3, { left: 0 }, '-=0.15')
        .to(this.myRef5.current, 0.65, { width: 201 }, '-=0.5')
        .to(this.myRef3.current, 0.7, { left: 55, opacity: 1 }, 0.7)
        .to(this.myRef2.current, 0.5, { width: 400 }, '-=0.7')
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  signUpHandler = () => {
    // const { emailError, passwordError, submitError } = this.state
    var tl = new TimelineMax()
    this.setState({ passwordError: 'kfjdls' })

    // if (emailError || passwordError || submitError) {
    tl.to(this.errorBox.current, 0.6, { top: 30, ease: Power4.easeOut })
    // }
  }

  render() {
    const {
      // emailError,
      passwordError,
      // submitError,
      // passwordErrorText,
      // submitErrorText,
      // emailErrorText,
      signUp
    } = this.state

    return (
      <Wrapper>
        <MainWrapper>
          <UserWelcome innerRef={this.myRef3}>
            <WelcomeTitle>Welcome Back!</WelcomeTitle>
            <WelcomeText>To keep connected with us please login with your personal info</WelcomeText>
          </UserWelcome>
          <GuestWelcome innerRef={this.myRef4}>
            <WelcomeTitle>Hello, Friend!</WelcomeTitle>
            <WelcomeText>Enter your personal details and start journey with us</WelcomeText>
          </GuestWelcome>
          <Sidebar innerRef={this.myRef2}>
            <LoginContainer innerRef={this.myRef6}>
              <SidebarButton innerRef={this.myRef5} onClick={this.buttonHandler}>
                {signUp ? 'Sign In' : 'Sign Up'}
              </SidebarButton>
            </LoginContainer>
          </Sidebar>
          <Form innerRef={this.myRef}>
            <Error innerRef={this.errorBox}>
              <ErrorBox />
            </Error>
            <Title>{signUp ? 'Create Account' : 'Log in to TestFlight'}</Title>
            <SocialMedia>
              <SocialIcon alt="fb" src={fb} />
              <SocialIcon alt="googlePlus" src={googlePlus} />
              <SocialIcon alt="twitter" src={twitter} />
            </SocialMedia>
            <AlternativeJoin>
              {signUp ? 'or use your email for registration:' : 'or use your email account:'}
            </AlternativeJoin>
            {signUp && (
              <Icon>
                <InputField
                  type="text"
                  placeholder="Name"
                  borderColor={passwordError && '#e01d5a'}
                  innerRef={this.name}
                />
                <InputIcon alt="user" src={user} />
              </Icon>
            )}
            <Icon>
              <InputField
                onChange={e => this.onEmailChange(e)}
                type="email"
                value={this.state.email}
                placeholder="Email"
                borderColor={passwordError === 1 && '#e01d5a'}
                innerRef={el => (this.email = el)}
              />
              <InputIcon alt="mail" src={mail} />
            </Icon>
            <Icon>
              <InputField
                onChange={e => this.onPasswordChange(e)}
                type="password"
                value={this.state.password}
                placeholder="Password"
                borderColor={passwordError === 1 && '#e01d5a'}
              />
              <InputIcon alt="locked" src={locked} />
            </Icon>
            <Button onClick={this.signUpHandler}>{signUp ? 'Sign Up' : 'Sign In'}</Button>
          </Form>
        </MainWrapper>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: bindActionCreators(userLogin, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.user.data,
    errors: state.user.errors
  }
}

const LoginComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
export default withCookies(LoginComponent)
