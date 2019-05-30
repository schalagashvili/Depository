import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCeFFBcKOhogqpCEbGKxtqgZyJC5_ApPnM',
  authDomain: 'depostore-c9fee.firebaseapp.com',
  databaseURL: 'https://depostore-c9fee.firebaseio.com',
  projectId: 'depostore-c9fee',
  storageBucket: 'depostore-c9fee.appspot.com',
  messagingSenderId: '697388473396',
  appId: '1:697388473396:web:4aff54bd954f0ec1'
}

firebase.initializeApp(firebaseConfig)

export default firebase
