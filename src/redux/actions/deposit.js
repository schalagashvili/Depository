import { GET_ACTIVE_DEPOSITS_QUANTITY, GET_DEPOSITS } from '../actionTypes'
import firebase from '../../firebase'
const db = firebase.firestore()

export function getActiveDeposistsQuantity(email, password, id) {
  return function(dispatch) {
    const userRef = db.collection('users').doc(id)
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
        dispatch({ type: GET_ACTIVE_DEPOSITS_QUANTITY, payload: result })
      })
  }
}

export function addDeposit(id, deposit) {
  return function(dispatch) {
    const userRef = db.collection('users').doc(id)
    const depositsRef = userRef.collection('deposits').doc()

    depositsRef
      .set({
        bankName: 'tralalala',
        initialAmount: 123,
        interestRate: 3,
        tax: 5,
        startDate: new Date('2019-01-01').getTime(),
        endDate: new Date('2019-09-01').getTime(),
        createdAt: new Date().getTime()
      })
      .then(res => console.log(res, 'ress'))
      .catch(error => console.log(error, 'err'))
  }
}

export function getDeposits(id, next, previous, filter) {
  return function(dispatch) {
    const userRef = db.collection('users').doc(id)
    const depositsRef = userRef.collection('deposits')

    let deposits

    if (next) {
      deposits = depositsRef
        .where('endDate', '>', new Date().getTime())
        .orderBy('endDate', 'desc')
        .orderBy('createdAt', 'desc')
        .startAfter(next)
        .limit(5)
    } else if (previous) {
      deposits = depositsRef
        .where('endDate', '>', new Date().getTime())
        .orderBy('endDate', 'desc')
        .orderBy('createdAt', 'desc')
        .endBefore(previous)
        .limit(5)
    } else if (filter) {
      return filteredDeposits(id, filter, dispatch)
    } else {
      deposits = depositsRef
        .where('endDate', '>', new Date().getTime())
        .orderBy('endDate', 'desc')
        .orderBy('createdAt', 'desc')
        .limit(5)
    }

    return deposits.get().then(snapshot => {
      dispatch({ type: GET_DEPOSITS, payload: snapshot.docs })
    })
  }
}

//startFrom, startTo, endFrom, endTo, initialMin, initialMax, bankName
export function filteredDeposits(id, filter, dispatch) {
  // const depositsRef = db
  //   .collection('users')
  //   .doc(id)
  //   .collection('deposits')

  // depositsRef
  //   .where('initialAmount', '>=', initialMin)
  //   .where('initialAmount', '<=', initialMax)
  //   .where('bankName', '==', bankName)
  const depositsRef = db
    .collection('users')
    .doc('Qi18hNlKCVaYUtLos4z78DT3KEb2')
    .collection('deposits')

  const startFrom = 0
  const startTo = 2000000000000000000000000000000000
  const endFrom = 3
  const endTo = 4000000000000000000000000000000000000
  depositsRef
    .where('initialAmount', '>=', 100)
    .where('initialAmount', '<=', 5000)
    .where('bankName', '==', 'tralalala')
    .get()
    .then(async docs => {
      console.log(docs.size, 'zomaa')
      let dataDocs = []
      await docs.forEach(async doc => {
        const docData = await doc.data()
        if (
          docData.startDate >= startFrom &&
          docData.startDate <= startTo &&
          docData.endDate >= endFrom &&
          docData.endDate <= endTo
        ) {
          dataDocs.push(docData)
        }
      })
      dispatch({ type: GET_DEPOSITS, payload: dataDocs })
      console.log(dataDocs, 'kodebi')
    })
}
