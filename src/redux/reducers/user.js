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
  USER_SIGNUP_STARTED,
  USER_SIGNUP_SUCCEEDED,
  USER_SIGNUP_FAILED,
  EDIT_USER_CALORIES_STARTED,
  EDIT_USER_CALORIES_SUCCEEDED,
  EDIT_USER_CALORIES_FAILED,
  GOOGLE_LOGIN_STARTED,
  GOOGLE_LOGIN_SUCCEEDED,
  GOOGLE_LOGIN_FAILED,
  FB_LOGIN_STARTED,
  FB_LOGIN_SUCCEEDED,
  FB_LOGIN_FAILED,
  TWITTER_LOGIN_STARTED,
  TWITTER_LOGIN_SUCCEEDED,
  TWITTER_LOGIN_FAILED,
  IMAGE_UPLOADED,
  GET_USERS_SUCCEEDED
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
    case GOOGLE_LOGIN_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case GOOGLE_LOGIN_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case GOOGLE_LOGIN_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case FB_LOGIN_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case FB_LOGIN_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case FB_LOGIN_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case TWITTER_LOGIN_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case TWITTER_LOGIN_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: { token: action.payload }
      }
    case TWITTER_LOGIN_FAILED:
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
    case USER_SIGNUP_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case USER_SIGNUP_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case USER_SIGNUP_FAILED:
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
    case GET_USERS_SUCCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case IMAGE_UPLOADED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    default:
      return state
  }
}
