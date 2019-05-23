import * as firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
// import 'firebase/functions'
// import 'firebase/messaging'
import 'firebase/storage'
// import 'firebase/performance'
// import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAs9kpiQU6OLVDohqA2ZUShtncXzO_JzCc',
  authDomain: 'have-a2380.firebaseapp.com',
  databaseURL: 'https://have-a2380.firebaseio.com',
  projectId: 'have-a2380',
  storageBucket: 'have-a2380.appspot.com',
  messagingSenderId: '693503825190',
  appId: '1:693503825190:web:e5380d11f621ebcd'
}

firebase.initializeApp(firebaseConfig)
