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
  IMAGE_UPLOADED,
  GET_USERS_SUCCEEDED,
  GET_USER_STARTED,
  GET_USER_SUCCEEDED,
  GET_USERS_FAILED,
  USER_LOGIN_STARTED,
  USER_LOGIN_SUCCEEDED,
  USER_LOGIN_FAILED,
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
import firebase from '../../firebase'
const db = firebase.firestore()
const storageRef = firebase.storage().ref()

export function signIn(email, password) {
  return function(dispatch) {
    dispatch({ type: USER_LOGIN_STARTED })
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const currentUser = firebase.auth().currentUser
        currentUser.getIdToken().then(data => {
          console.log(currentUser.uid)
          dispatch({ type: USER_LOGIN_SUCCEEDED, payload: { token: data, userId: currentUser.uid } })
        })
      })
      .catch(error => {
        dispatch({ type: USER_LOGIN_FAILED, payload: error.message })
      })
  }
}

const storeNewUser = (name, role, id, email, address, phone) => {
  firebase
    .firestore()
    .collection('private')
    .doc(id)
    .set({
      verified: false,
      role: 1,
      createdAt: new Date().getTime()
    })

  firebase
    .firestore()
    .collection('users')
    .doc(id)
    .set({
      name,
      address,
      phone,
      email,
      userId: id
    })
}

export function signUp(name, email, password, role) {
  return function(dispatch) {
    dispatch({ type: USER_SIGNUP_STARTED })
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            firebase.auth().currentUser.sendEmailVerification()
            const currentUser = firebase.auth().currentUser
            console.log(currentUser)
            currentUser.getIdToken().then(data => {
              dispatch({ type: USER_SIGNUP_SUCCEEDED, payload: { token: data, userId: currentUser.uid } })
              storeNewUser(name, role, currentUser.uid, email, null, null)
            })
          })
      })
      .catch(error => {
        dispatch({ type: USER_SIGNUP_FAILED, payload: error.message })
      })
  }
}

export function resetPassword() {
  return function(dispatch) {
    var auth = firebase.auth()
    var emailAddress = 'watsonharden@yahoo.com'

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function() {
        console.log('email sent')
        // Email sent.
      })
      .catch(function(error) {
        // An error happened.
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

var auth = firebase.auth()
var emailAddress = 'user@example.com'

auth
  .sendPasswordResetEmail(emailAddress)
  .then(function() {
    // Email sent.
  })
  .catch(function(error) {
    // An error happened.
  })

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
      .then(data => {
        const currentUser = firebase.auth().currentUser
        console.log(data.additionalUserInfo && data.additionalUserInfo.profile, 'dataa')
        currentUser.getIdToken().then(data => {
          const name = data.additionalUserInfo && data.additionalUserInfo.profile.name
          const location = data.additionalUserInfo && data.additionalUserInfo.profile.location
          if (data.additionalUserInfo && data.additionalUserInfo.isNewUser) {
            storeNewUser(name, 1, currentUser.uid, location, '555')
          }
          console.log(currentUser.uid, 'kfldj')
          dispatch({ type: USER_SIGNUP_SUCCEEDED, payload: { token: data, userId: currentUser.uid } })
        })
        console.log(data)
        dispatch({ type: TWITTER_LOGIN_SUCCEEDED, payload: data.credential.accessToken })
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

export function getUser(id) {
  return function(dispatch) {
    return dispatchUser(dispatch, id)
  }
}

const dispatchUser = (dispatch, id) => {
  console.log('dispatch', id)
  var docRef = db.collection('users').doc(id)
  return docRef
    .get()
    .then(function(doc) {
      const currentUser = firebase.auth().currentUser
      const docData = doc.data()
      return db
        .collection('private')
        .doc(id)
        .get()
        .then(function(privateDoc) {
          console.log('usssssssss', privateDoc.data())
          const data = {
            name: docData.name,
            email: docData.email,
            phone: docData.phone,
            address: docData.address,
            emailVerified: currentUser.emailVerified,
            mobileVerified: privateDoc.data().verified,
            sideImg: docData.sideImage,
            thumbImg: docData.thumbImage,
            id: docData.userId,
            role: privateDoc.data().role
          }
          return dispatch({ type: GET_USER_SUCCEEDED, payload: data })
        })
    })
    .catch(function(error) {
      return error
    })
}

export function editUser(id, name, address, phoneNumber) {
  console.log(id, name, address, phoneNumber, 'infoo')
  return function(dispatch) {
    dispatch({ type: EDIT_USER_SUCCEEDED })
    db.collection('users')
      .doc(id)
      .update({
        name,
        address,
        phone: phoneNumber
      })
      .then(function() {
        dispatchUser(dispatch, id)
      })
  }
}

export function logout(id) {
  return function(dispatch) {
    dispatch({ type: EDIT_USER_SUCCEEDED })

    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log('signed out')
        },
        error => {
          console.log(error)
        }
      )
  }
}

export function uploadImage(id, file) {
  return function(dispatch) {
    const userRef = db.collection('users').doc(id)
    var storage = firebase.storage()
    var storageRef = storage.ref()
    var metadata = {
      contentType: 'image/jpeg',
      userId: id
    }
    var uploadTask = storageRef.child('images/' + metadata.userId).put(file, metadata)

    return uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            break
          case firebase.storage.TaskState.RUNNING:
            break
          default:
            break
        }
      },
      function(error) {
        return error
      },
      function() {
        return uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          return dispatchUser(dispatch, id)
          console.log(downloadURL, 'urrl')
          userRef.update({
            imageUrl: downloadURL
          })
        })
      }
    )
  }
}
