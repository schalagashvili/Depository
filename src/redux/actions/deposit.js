import { GET_ACTIVE_DEPOSITS_QUANTITY } from '../actionTypes'
import firebase from '../../firebase'
const db = firebase.firestore()

export function getActiveDeposistsQuantity(email, password) {
  return function(dispatch) {
    const userRef = db.collection('users').doc('7yRn5TUGVHA3TMzspJQm')
    const depositsRef = userRef.collection('deposits')
    return depositsRef
      .get()
      .then(docs => {
        let totalNumberOfActiveDeposits = 0
        docs.forEach(doc => {
          doc = doc.data()
          if (new Date() <= new Date(doc.endDate)) {
            totalNumberOfActiveDeposits += 1
          }
        })
        return Promise.resolve(totalNumberOfActiveDeposits)
      })
      .then(result => {
        console.log('rezz')
        dispatch({ type: GET_ACTIVE_DEPOSITS_QUANTITY, payload: result })
      })
  }
}

export function getDeposits() {
  return function(dispatch) {
    const userRef = db.collection('users').doc('7yRn5TUGVHA3TMzspJQm')
    const depositsRef = userRef.collection('deposits')

    const first = depositsRef
      .where('endDate', '>', new Date().getDate())
      .orderBy('endDate', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(5)

    first.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        // console.log(doc.data())
      })
      dispatch({ type: GET_ACTIVE_DEPOSITS_QUANTITY, payload: snapshot.docs })
      // console.log(snapshot)
      var last = snapshot.docs[snapshot.docs.length - 1]
    })
  }
}

export function getNextDeposits(last) {
  return function(dispatch) {
    const userRef = db.collection('users').doc('7yRn5TUGVHA3TMzspJQm')
    const depositsRef = userRef.collection('deposits')

    var next = depositsRef
      .where('endDate', '>', new Date().getDate())
      .orderBy('endDate', 'desc')
      // .orderBy('createdAt', 'desc')
      .startAfter(last)
      .limit(5)

    next.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        // console.log(doc.data())
      })
      dispatch({ type: GET_ACTIVE_DEPOSITS_QUANTITY, payload: snapshot.docs })
      // console.log(snapshot)
      var last = snapshot.docs[snapshot.docs.length - 1]
    })
  }
}

export function deleteUser(bankName, initialAmount, tax, interestRate, startDate, endDate) {
  return function(dispatch) {
    const userRef = db.collection('users').doc('7yRn5TUGVHA3TMzspJQm')
    const depositsRef = userRef.collection('deposits')

    depositsRef.doc().set({
      bankName,
      initialAmount,
      tax,
      interestRate,
      startDate,
      endDate,
      createdAt: new Date().getTime()
    })
  }
}
