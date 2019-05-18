import React from 'react'

function InputField(props) {
  return (
    <div style={{ marginTop: 45 }}>
      <div style={{ fontSize: 14, color: '#727272', marginBottom: 7, marginLeft: 5 }}>{props.title}</div>
      <input
        style={{
          width: 350,
          height: 55,
          borderRadius: 5,
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
          border: 'none',
          // border: '2px solid #F1F1F1',
          // backgroundColor: '#FBFBFB',
          textAlign: 'center',
          fontSize: 16,
          outline: 'none'
        }}
      />
    </div>
  )
}

export default InputField
