import { SWITCH_LANGUAGE } from '../actionTypes'

export function switchLanguage(language) {
  return function(dispatch) {
    dispatch({
      type: SWITCH_LANGUAGE,
      payload: {
        language
      }
    })
  }
}
