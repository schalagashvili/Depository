import {
  GOOGLE_LOGIN_STARTED,
  GOOGLE_LOGIN_SUCCEEDED,
  GOOGLE_LOGIN_FAILED,
  FB_LOGIN_STARTED,
  FB_LOGIN_SUCCEEDED,
  FB_LOGIN_FAILED,
  TWITTER_LOGIN_STARTED,
  TWITTER_LOGIN_SUCCEEDED,
  TWITTER_LOGIN_FAILED,
  USER_SIGNUP_STARTED,
  USER_SIGNUP_SUCCEEDED,
  USER_SIGNUP_FAILED,
  GET_USER_STARTED,
  GET_USER_SUCCEEDED,
  GET_USERS_FAILED,
  USER_LOGIN_STARTED,
  USER_LOGIN_SUCCEEDED,
  USER_LOGIN_FAILED,
  DELETE_USER_STARTED,
  DELETE_USER_SUCCEEDED,
  UDELETE_USER_FAILED,
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
import { RSAA } from 'redux-api-middleware'
import config from '../../config'
import * as firebase from 'firebase/app'

export function signIn(email, password) {
  return function(dispatch) {
    dispatch({ type: USER_LOGIN_STARTED })
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(data => {
            dispatch({ type: USER_LOGIN_SUCCEEDED, payload: { token: data } })
          })
      })
      .catch(error => {
        dispatch({ type: USER_LOGIN_FAILED, payload: error.message })
      })
  }
}

const storeNewUser = (name, role) => {
  firebase
    .firestore()
    .collection('private')
    .doc()
    .set({
      verified: false,
      role
    })
}

export function signUp(name, email, password, role) {
  return function(dispatch) {
    dispatch({ type: USER_SIGNUP_STARTED })
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .firestore()
          .collection('users')
          .doc()
          .set({
            verified: false,
            name,
            role
          })
          .then(() => {
            storeNewUser(name, role)
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                firebase.auth().currentUser.sendEmailVerification()
                firebase
                  .auth()
                  .currentUser.getIdToken()
                  .then(data => {
                    dispatch({ type: USER_SIGNUP_SUCCEEDED, payload: { token: data } })
                  })
              })
          })
      })
      .catch(error => {
        dispatch({ type: USER_SIGNUP_FAILED, payload: error.message })
      })
  }
}

export function fbAuth() {
  const provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().languageCode = 'en_EN'

  provider.setCustomParameters({
    display: 'popup'
  })

  return function(dispatch) {
    dispatch({ type: FB_LOGIN_STARTED })
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        dispatch({ type: FB_LOGIN_SUCCEEDED })
      })
      .catch(error => {
        dispatch({ type: FB_LOGIN_FAILED, payload: error.message })
      })
  }
}

export function twitterAuth() {
  const provider = new firebase.auth.TwitterAuthProvider()
  provider.setCustomParameters({
    display: 'popup'
  })

  return function(dispatch) {
    dispatch({ type: TWITTER_LOGIN_STARTED })
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        dispatch({ type: TWITTER_LOGIN_SUCCEEDED })
      })
      .catch(error => {
        dispatch({ type: TWITTER_LOGIN_FAILED, payload: error.message })
      })
  }
}

export function googleAuth() {
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({
    display: 'popup'
  })

  return function(dispatch) {
    dispatch({ type: GOOGLE_LOGIN_STARTED })
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        // redirect to login page
        dispatch({ type: GOOGLE_LOGIN_SUCCEEDED })
      })
      .catch(error => {
        dispatch({ type: GOOGLE_LOGIN_FAILED, payload: error.message })
      })
  }
}
