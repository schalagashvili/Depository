import React, { Component } from 'react'
import { InputField } from '../../components'
import profile from '../../assets/images/profile.png'
import error from '../../assets/images/error.png'
import checkmark from '../../assets/images/checkmark.png'
import pencil from '../../assets/images/pencil.png'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { editUser, uploadImage, getUser } from '../../redux/actions/user'
import ReactGA from 'react-ga'
import { withCookies } from 'react-cookie'
import '../../styles/styles.css'

class Profile extends Component {
  state = {
    name: null,
    address: null,
    phone: null,
    email: null,
    image: null,
    imgPreview: null,
    smsCode: null
  }

  async componentDidMount() {
    await this.props.getUser(this.props.cookies.get('cookie'))
    const name = this.props.user && this.props.user.name
    const address = this.props.user && this.props.user.address
    const phone = this.props.user && this.props.user.phone
    const email = this.props.user && this.props.user.email

    this.setState({ name, address, phone, email })
  }

  onChangeHandler = event => {
    ReactGA.event({
      category: 'User',
      action: 'Uploaded Image'
    })
    this.setState({ image: event.target.files[0], imgPreview: URL.createObjectURL(event.target.files[0]) })
  }

  onChange = (key, value) => {
    this.setState({ [key]: value })
    console.log(this.state.address, 'address', key, value)
  }

  onSave = async () => {
    console.log(this.props.cookies.get('token'), this.state.name, this.state.address, this.state.phone)
    await this.props.editUser(this.props.cookies.get('cookie'), this.state.name, this.state.address, this.state.phone)
    await this.props.uploadImage(this.props.cookies.get('cookie'), this.state.image)
    this.setState({ imgPreview: null })
  }

  verifyNumber = () => {
    fetch('https://us-central1-depostore-c9fee.cloudfunctions.net/generateSMSCode', {
      body: JSON.stringify({
        idToken: this.props.cookies.get('token'),
        userId: this.props.cookies.get('cookie'),
        mobileNumber: '+995598960555'
      }),
      method: 'post'
    }).then(res => console.log(res, 'ragac nitoa'))
  }

  verifySMSCode = () => {
    fetch('https://us-central1-depostore-c9fee.cloudfunctions.net/verifySMSCode', {
      body: JSON.stringify({
        idToken: this.props.cookies.get('token'),
        code: this.state.smsCode
      }),
      method: 'post'
    }).then(res => console.log(res, 'ragac nitoa'))
  }

  render() {
    const name = this.props.user && this.props.user.name
    const address = this.props.user && this.props.user.address
    const phone = this.props.user && this.props.user.phone
    const email = this.props.user && this.props.user.email
    const emailVerified = this.props.user && this.props.user.emailVerified
    const image = this.props.user && this.props.user.thumbImg

    if (!name) {
      return <div>Loading</div>
    }
    return (
      <div
        onClick={() => {
          ReactGA.event({
            category: 'User',
            action: 'Created an Account'
          })
        }}
        style={{
          paddingLeft: 270,
          width: '100%',
          minHeight: '100vh',
          height: '100%',
          backgroundColor: '#eff3f9',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            boxShadow: '0 1px 25px rgba(0, 0, 0, 0.05)',
            height: 670,
            backgroundColor: 'white',
            width: 1100,
            borderRadius: 20,
            marginTop: 100,
            padding: 50
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: 800, margin: 'auto' }}>
            <img
              src={this.state.imgPreview || image}
              alt="profileImage"
              style={{
                width: 200,
                height: 200,
                borderRadius: 255,
                // border: '5px solid white',
                boxShadow: '0 1px 15px rgba(0, 0, 0, 0.2)'
              }}
            />
            <div>
              <img
                src={pencil}
                alt="pencil"
                style={{
                  width: 35,
                  height: 35,
                  marginLeft: -37,
                  marginTop: 100
                }}
              />
              <input
                type="file"
                name="file"
                onChange={this.onChangeHandler}
                accept="image/png, image/jpeg"
                size={120}
                style={
                  {
                    // marginLeft: -30,
                    // marginTop: -15,
                    // zIndex: -1
                  }
                }
              />
            </div>
            <div style={{ marginLeft: 40, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 30 }}>{name}</div>
              <div style={{ color: '#AFAFAF' }}>{address}</div>
            </div>
          </div>
          <div
            style={{ width: 800, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: 'auto' }}
          >
            <input onChange={e => this.setState({ smsCode: e.target.value })} />
            <InputField
              title="Full Name"
              onChange={this.onChange}
              identifier="name"
              value={this.state.name}
              defaultValue={name}
            />
            <div style={{ position: 'relative' }}>
              <InputField disabled title="Email" defaultValue={email} />
              <img
                src={emailVerified ? checkmark : error}
                style={{ width: 30, height: 30, position: 'absolute', right: 15, top: 83 }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <InputField
                title="Mobile"
                onChange={this.onChange}
                identifier="phone"
                value={this.state.phone}
                defaultValue={phone}
              />
              <div onClick={this.verifyNumber}>verify</div>
              <div onClick={this.verifySMSCode}>verify sms code</div>
              {phone !== null && (
                <img
                  src={emailVerified ? checkmark : error}
                  style={{ width: 30, height: 30, position: 'absolute', right: 15, top: 83 }}
                />
              )}
            </div>
            <InputField
              title="Location"
              onChange={this.onChange}
              identifier="address"
              value={this.state.address}
              defaultValue={address}
            />
          </div>
          <div
            style={{ display: 'flex', margin: '70px auto', justifyContent: 'center', width: 800, alignItems: 'center' }}
          >
            <div
              style={{
                borderRadius: 40,
                backgroundImage: 'linear-gradient(253deg, #3ba5b4 0,#38ba8a 0% )',
                boxShadow: '0 1px 14px rgba(0, 0, 0, 0.18)',
                padding: '10px 20px',
                color: 'white',
                marginLeft: 20,
                width: 140,
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={this.onSave}
            >
              Save
            </div>
            <div style={{ color: 'red', marginLeft: 20 }} onClick={() => this.props.uploadImage()}>
              Close account
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editUser: bindActionCreators(editUser, dispatch),
    getUser: bindActionCreators(getUser, dispatch),
    uploadImage: bindActionCreators(uploadImage, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.user && state.user.data
  }
}

const ProfileComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
export default withCookies(ProfileComponent)
