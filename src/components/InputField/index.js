import React from 'react'

function InputField(props) {
  let unit, value
  if (!props.unit) {
    unit = ''
  } else {
    if (props.unit === '$') {
      unit = `${props.unit} ${props.value}`
    } else {
      unit = `${props.value} ${props.unit}`
    }
  }

  if (props.value && props.value > 1000) {
    // value =
  }

  return (
    <div style={{ marginTop: props.marginTop || 45 }}>
      <div style={{ fontSize: 14, color: '#727272', marginBottom: 7, marginLeft: 5 }}>{props.title}</div>
      <input
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        value={props.value}
        // value={unit}
        onChange={e => props.onChange(props.identifier, e.target.value)}
        style={{
          width: props.width || 350,
          height: props.height || 55,
          borderRadius: 5,
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
          border: 'none',
          textAlign: 'center',
          fontSize: 16,
          outline: 'none'
        }}
      />
    </div>
  )
}

export default InputField
