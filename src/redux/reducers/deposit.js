import { GET_ACTIVE_DEPOSITS_QUANTITY } from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ACTIVE_DEPOSITS_QUANTITY:
      console.log(action, 'kfdsl')
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    default:
      return state
  }
}
