import React, { Component } from 'react'
import danger from '../../assets/images/danger.png'

const ErrorBox = () => {
  const errors = [
    'Please provide valid email',
    'Password must contain at least 8 character',
    'Please fill in all fields'
  ]

  return (
    <div
      style={{
        width: 450,
        padding: 15,
        backgroundColor: '#e01d5a',
        color: 'white',
        borderRadius: 6,

        display: 'flex',
        alignItems: 'center'
      }}
    >
      <img src={danger} alt="danger" style={{ width: 30, height: 30 }} />
      <div style={{ marginLeft: 25, display: 'flex', flexDirection: 'column' }}>
        {errors.map((error, index) => {
          return <div key={`${index}${error}`}>• {error} </div>
        })}
      </div>
    </div>
  )
}

export default ErrorBox
