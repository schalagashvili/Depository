import { GET_USERS_SUCCEEDED } from '../actionTypes'
import firebase from '../../firebase'
const db = firebase.firestore()
// const db = firebase.firestore()

export function getUsers(role, last) {
  return function(dispatch) {
    const usersRef = db.collection('private')
    let users
    console.log(last, 'last')
    if (last) {
      users = usersRef
        .where('role', '<', role)
        .orderBy('role', 'desc')
        .orderBy('createdAt', 'desc')
        .startAfter(last)
        .limit(5)
    } else {
      users = usersRef
        .where('role', '<', role)
        .orderBy('role', 'desc')
        .orderBy('createdAt', 'desc')
        .limit(5)
    }

    return users.get().then(snapshot => {
      let usersArr = []
      return snapshot.docs.forEach(doc => {
        return db
          .collection('users')
          .doc(doc.id)
          .get()
          .then(userDoc => {
            const enhancedUser = userDoc.data()
            enhancedUser.role = doc.data().role
            usersArr.push(enhancedUser)
            if (snapshot.size === usersArr.length) {
              return dispatch({ type: GET_USERS_SUCCEEDED, payload: usersArr })
            }
          })
      })
    })
  }
}
