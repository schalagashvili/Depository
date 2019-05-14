import {
  GET_USER_STARTED,
  GET_USER_SUCCEEDED,
  GET_USERS_FAILED,
  USER_LOGIN_STARTED,
  USER_LOGIN_SUCCEEDED,
  USER_LOGIN_FAILED,
  GET_ALL_USERS_STARTED,
  GET_ALL_USERS_SUCCEEDED,
  GET_ALL_USERS_FAILED,
  EDIT_USER_STARTED,
  EDIT_USER_SUCCEEDED,
  EDIT_USER_FAILED,
  ADD_NEW_USER_STARTED,
  ADD_NEW_USER_SUCCEEDED,
  ADD_NEW_USER_FAILED,
  SIGN_UP_USER_STARTED,
  SIGN_UP_USER_SUCCEEDED,
  SIGN_UP_USER_FAILED,
  EDIT_USER_CALORIES_STARTED,
  EDIT_USER_CALORIES_SUCCEEDED,
  EDIT_USER_CALORIES_FAILED
} from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case GET_USER_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case GET_USERS_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case USER_LOGIN_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case USER_LOGIN_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case USER_LOGIN_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case GET_ALL_USERS_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case GET_ALL_USERS_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case GET_ALL_USERS_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case EDIT_USER_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case EDIT_USER_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case EDIT_USER_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case ADD_NEW_USER_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case ADD_NEW_USER_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case ADD_NEW_USER_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case SIGN_UP_USER_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case SIGN_UP_USER_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case SIGN_UP_USER_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case EDIT_USER_CALORIES_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case EDIT_USER_CALORIES_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case EDIT_USER_CALORIES_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
  }
  return state
}
