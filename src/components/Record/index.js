import React, { Component } from 'react'
import { Record, IconsWrapper, Title, Calories, Icon } from './styles'
import { DeleteIcon, EditIcon } from '../../assets/icons'
import colors from '../../styles/colors'
import { withCookies } from 'react-cookie'

class RecordItem extends Component {
  onRoleChange = value => {
    console.log(this.props.cookies.get('token'), 'tkn')
    console.log('changed: ', value)
    fetch('https://us-central1-depostore-c9fee.cloudfunctions.net/changeRole', {
      body: JSON.stringify({
        userId: this.props.id,
        idToken: this.props.cookies.get('token'),
        newRole: value
      }),
      method: 'post'
    }).then(response => console.log(response))
  }

  deleteUser = () => {
    fetch('https://us-central1-depostore-c9fee.cloudfunctions.net/deleteUser', {
      body: JSON.stringify({
        userId: this.props.id,
        idToken: this.props.cookies.get('token')
      }),
      method: 'post'
    }).then(response => console.log(response))
  }

  roleDefaulValue = () => {
    const { role } = this.props

    if (role === 1) {
      return 1
    } else if (role === 2) {
      return 2
    } else {
      return 3
    }
  }

  render() {
    const { title, id, editOpenHandler, handleChange, onDelete, user } = this.props

    return (
      <Record key={title}>
        <Title>{title}</Title>
        {user && (
          <Calories>
            <select onChange={e => this.onRoleChange(e.target.value)} defaultValue={this.roleDefaulValue()}>
              <option value={1}>Regular</option>
              <option value={2}>Manager</option>
              <option value={3}>Admin</option>
            </select>
          </Calories>
        )}
        <IconsWrapper>
          {!user && (
            <Icon
              onClick={() => {
                editOpenHandler(false, id)
                handleChange('addBottom', true)
              }}
            >
              <EditIcon width={13} height={13} color={colors.gray} />
            </Icon>
          )}

          <Icon onClick={() => this.deleteUser()}>
            <DeleteIcon width={11} height={11} color={colors.tomato} />
          </Icon>
        </IconsWrapper>
      </Record>
    )
  }
}

export default withCookies(RecordItem)
