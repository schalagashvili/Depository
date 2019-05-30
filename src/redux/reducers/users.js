import { GET_USERS_SUCCEEDED } from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      console.log(action.payload, 'peiloadd')
      return {
        loading: true,
        errors: {},
        data: action.payload
      }
    default:
      return state
  }
}
