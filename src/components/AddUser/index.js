import React, { Component } from 'react'
import { Input, Button } from '../../styles/mixins'
import Drawer from '@material-ui/core/Drawer'
import { ErrorText } from '../../pages/SignUp/styles'
import { Add, AddContainer, InnerWrapper, RecordsHeader, Role, Buttons, Close } from './styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import colors from '../../styles/colors'

class AddRecord extends Component {
  render() {
    const {
      addBottom,
      emailError,
      passwordError,
      role,
      addRole,
      addError,
      emailErrorText,
      passwordErrorText,
      onEmailChange,
      onPasswordChange,
      onRoleChange,
      onAddNewUser,
      drawerHandler
    } = this.props

    return (
      <Drawer anchor='bottom' open={addBottom}>
        <Add id='add-user'>
          <InnerWrapper>
            <AddContainer>
              <RecordsHeader>Add User</RecordsHeader>
              <Input onChange={e => onEmailChange(e)} placeholder='Email' type='email' />
              {emailError === 1 ? <ErrorText>{emailErrorText}</ErrorText> : null}
              <Input onChange={e => onPasswordChange(e)} placeholder='Password' type='password' />
              {passwordError === 1 ? <ErrorText>{passwordErrorText}</ErrorText> : null}
              {role === 'admin' ? (
                <Role>
                  <span>Role: </span>
                  <select value={addRole || 'regular'} onChange={e => onRoleChange(e)}>
                    <option value='regular'>Regular</option>
                    <option value='manager'>Manager</option>
                    <option value='admin'>Admin</option>
                  </select>
                </Role>
              ) : (
                <Role>
                  <span>Role: </span>
                  <select value={addRole || 'regular'} onChange={e => onRoleChange(e)}>
                    <option value='regular'>Regular</option>
                    <option value='manager'>Manager</option>
                  </select>
                </Role>
              )}
              {addError != null ? <ErrorText>{addError}</ErrorText> : null}
              {this.props.addUserLoading &&  <CircularProgress color="secondary" />  }
              <Buttons>
                <Button color={colors.pink} onClick={() => onAddNewUser()}>
                  Save
                </Button>
                <Close onClick={() => drawerHandler()}>
                  Close
                </Close>
              </Buttons>
            </AddContainer>
          </InnerWrapper>
        </Add>
      </Drawer>
    )
  }
}

export default AddRecord
