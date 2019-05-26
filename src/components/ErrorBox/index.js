import React from 'react'
import danger from '../../assets/images/danger.png'

const ErrorBox = ({ passwordError, emailError, submitError, backendError }) => {
  const errors = [passwordError, emailError, submitError, backendError]

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
          if (error !== '') {
            return <div key={`${index}${error}`}>• {error} </div>
          }
          return null
        })}
      </div>
    </div>
  )
}

export default ErrorBox
