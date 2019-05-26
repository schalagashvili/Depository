import React, { Component } from 'react'
import { InputField } from '../../components'
import profile from '../../assets/images/profile.png'
import pencil from '../../assets/images/pencil.png'
import ReactGA from 'react-ga'
import { CSVLink } from 'react-csv'

const headers = [
  { label: 'First Name', key: 'firstname' },
  { label: 'Last Name', key: 'lastname' },
  { label: 'Email', key: 'email' }
]

const data = [
  { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
  { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
  { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' }
]

class Profile extends Component {
  onChangeHandler = event => {
    ReactGA.event({
      category: 'User',
      action: 'Created an Account'
    })
    console.log(event.target.files[0])
  }

  render() {
    return (
      <div
        onclick={() => {
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
              src={profile}
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
              <div style={{ fontSize: 30 }}>Sandro Chalagashvili</div>
              <div style={{ color: '#AFAFAF' }}>Tbilisi, Georgia</div>
            </div>
          </div>
          <div
            style={{ width: 800, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: 'auto' }}
          >
            <InputField title="Full Name" />
            <InputField title="Email" />
            <InputField title="Mobile" />
            <InputField title="Location" />
          </div>
          <div
            style={{ display: 'flex', margin: '70px auto', justifyContent: 'center', width: 800, alignItems: 'center' }}
          >
            <CSVLink data={data} headers={headers} filename={'proff.csv'} style={{ color: 'black' }}>
              Download me
            </CSVLink>
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
            >
              Save
            </div>
            <div style={{ color: 'red', marginLeft: 20 }}>Close account</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
