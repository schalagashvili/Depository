import { GET_ACTIVE_DEPOSITS_QUANTITY, GET_DEPOSITS, ADD_DEPOSIT } from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ACTIVE_DEPOSITS_QUANTITY:
      return {
        loading: false,
        errors: {},
        data: { ...state.data, depositsQuantity: action.payload }
      }
    case GET_DEPOSITS:
      return {
        loading: false,
        errors: {},
        data: { ...state.data, deposits: action.payload }
      }
    case ADD_DEPOSIT:
      return {
        loading: false,
        errors: {}
        // data: { ...state.data.deposits, deposits: action.payload }
      }
    default:
      return state
  }
}
