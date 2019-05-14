import { SWITCH_LANGUAGE } from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return {
        loading: true,
        errors: {},
        data: action.payload.language || 'en'
      }
    default:
      return {}
  }
}
