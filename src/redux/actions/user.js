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
import firebase from '../../firebase'

const db = firebase.firestore()

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

export function getUsers(role) {
  return function(dispatch) {
    const usersRef = db.collection('users')

    const first = usersRef
      .where('role', '<', role)
      .orderBy('role', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(5)

    var paginate = first.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data())
      })
      var last = snapshot.docs[snapshot.docs.length - 1]

      console.log('----------------------------------')

      var next = usersRef
        .where('role', '<', role)
        .orderBy('role', 'desc')
        .orderBy('createdAt', 'desc')
        .startAfter(last)
        .limit(5)
    })
  }
}

export function editUser(id, role) {
  return function(dispatch) {
    const userRef = db
      .collection('users')
      .doc('7yRn5TUGVHA3TMzspJQm')
      .update({
        role
      })
  }
}

export function logout(id) {
  return function(dispatch) {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          // Sign-out successful.
        },
        error => {
          // An error happened.
        }
      )
  }
}

export function deleteUser() {
  return function(dispatch) {
    // 1) jer wavushalot depositebi

    const userRef = db.collection('users').doc('7yRn5TUGVHA3TMzspJQm')
    deleteCollection(db, userRef.collection('deposits', 128))

    // 2) axla wavshalot tviton user data

    userRef.delete()

    // 3) axla wavshalot USER email auth da eg ra

    // admin
    //   .auth()
    //   .deleteUser(uid)
    //   .then(() => {
    //     console.log('Successfully deleted user')
    //   })
    //   .catch(error => {
    //     console.log('Error deleting user:', error)
    //   })

    function deleteCollection(db, collectionPath, batchSize) {
      var collectionRef = db.collection(collectionPath)
      var query = collectionRef.orderBy('__name__').limit(batchSize)

      return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, batchSize, resolve, reject)
      })
    }

    function deleteQueryBatch(db, query, batchSize, resolve, reject) {
      query
        .get()
        .then(snapshot => {
          // When there are no documents left, we are done
          if (snapshot.size == 0) {
            return 0
          }

          // Delete documents in a batch
          var batch = db.batch()
          snapshot.docs.forEach(doc => {
            batch.delete(doc.ref)
          })

          return batch.commit().then(() => {
            return snapshot.size
          })
        })
        .then(numDeleted => {
          if (numDeleted === 0) {
            resolve()
            return
          }

          // Recurse on the next process tick, to avoid
          // exploding the stack.
          process.nextTick(() => {
            deleteQueryBatch(db, query, batchSize, resolve, reject)
          })
        })
        .catch(reject)
    }
  }
}

export function uploadImage(id) {
  return function(dispatch) {
    const userRef = db.collection('users').doc('7yRn5TUGVHA3TMzspJQm')

    // File or Blob named mountains.jpg
    var file = 'file aq'

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg',
      userId: id
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
    // var uploadTask = storageRef.child('images/' + file.name).put(file, metadata)

    // // Listen for state changes, errors, and completion of the upload.
    // uploadTask.on(
    //   firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    //   function(snapshot) {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     console.log('Upload is ' + progress + '% done')
    //     switch (snapshot.state) {
    //       case firebase.storage.TaskState.PAUSED: // or 'paused'
    //         console.log('Upload is paused')
    //         break
    //       case firebase.storage.TaskState.RUNNING: // or 'running'
    //         console.log('Upload is running')
    //         break
    //     }
    //   },
    //   function(error) {
    //     console.log(error)
    //   },
    //   function() {
    //     // Upload completed successfully, now we can get the download URL
    //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    //       console.log('File available at', downloadURL)
    //       userRef.update({
    //         imageUrl: downloadURL
    //       })
    //     })
    //   }
    // )
  }
}
