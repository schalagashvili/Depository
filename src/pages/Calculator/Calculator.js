import React, { Component } from 'react'
import { InputField, Slider } from '../../components'
import profile from '../../assets/images/profile.png'
import pencil from '../../assets/images/pencil.png'

class Profile extends Component {
  render() {
    return (
      <div
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
            height: 800,
            backgroundColor: 'white',
            width: 800,
            borderRadius: 20,
            marginTop: 40,
            display: 'flex',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 60 }}>
            <div style={{ fontSize: 32, padding: '20px 75px 0', marginBottom: -30, fontWeight: 600, color: '#38ba8a' }}>
              Deposit Calculator
            </div>
            <Slider
              initialValue={10000}
              step={100}
              max={100000}
              title="Initial Amount"
              rangeMin="$1,000"
              rangeMax="$100,000"
              unit="$"
              min={1000}
            />
            <Slider
              initialValue={10}
              step={0.1}
              max={20}
              title="Interest Percentage"
              rangeMin="-20%"
              rangeMax="20%"
              min={-20}
              unit="%"
            />
            <Slider initialValue={15} step={0.1} max={40} title="Tax" rangeMin="0%" rangeMax="40%" unit="%" min={0} />
            <Slider
              initialValue={12}
              step={1}
              max={72}
              title="Deposit Term"
              rangeMin="1 mo."
              rangeMax="72 mos."
              unit="mo."
              min={1}
            />
            <div
              style={{
                borderRadius: 40,
                backgroundImage: 'linear-gradient(253deg, #3ba5b4 0,#38ba8a 0% )',
                boxShadow: '0 1px 14px rgba(0, 0, 0, 0.18)',
                padding: '10px 20px',
                color: 'white',
                marginLeft: 'auto',
                marginRight: 70,
                marginTop: 45,
                width: 140,
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              Calculate
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 300,
            marginTop: 40,
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 1px 25px rgba(0, 0, 0, 0.05)',
            borderRadius: 20,
            marginLeft: 20,
            height: 800,
            padding: '30px 0',
            backgroundColor: 'white'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              height: 128,
              width: 240
            }}
          >
            <div style={{ fontSize: 25, color: '#00a3e0' }}>Total Interest:</div>
            <div style={{ fontSize: 35, fontWeight: 900, marginTop: 5, color: '#38ba8a' }}>$400</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              height: 128,
              width: 240,
              marginTop: 40
            }}
          >
            <div style={{ fontSize: 25, color: '#00a3e0' }}>Total Save:</div>
            <div style={{ fontSize: 32, fontWeight: 900, marginTop: 5 }}>$7,000</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              height: 128,
              width: 240,
              marginTop: 40
            }}
          >
            <div style={{ fontSize: 25, color: '#00a3e0' }}>Tax:</div>
            <div style={{ fontSize: 32, fontWeight: 900, marginTop: 5 }}>2.1%</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              height: 128,
              width: 240,
              marginTop: 40
            }}
          >
            <div style={{ color: '#00a3e0', fontSize: 25 }}>Interest Rate:</div>
            <div style={{ fontSize: 32, fontWeight: 900, marginTop: 5 }}>5.7%</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              height: 128,
              width: 240,
              marginTop: 40
            }}
          >
            <div style={{ color: '#00a3e0', fontSize: 25 }}>Deposit Term:</div>
            <div style={{ fontSize: 27, fontWeight: 900, marginTop: 5 }}>12 mos.</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
