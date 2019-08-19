import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { firebase } from './firebase/firebase'
import { fetchCollectionIds } from './firebase/collectionFunctions'
import App from './App'
import { store, rrfProps } from './store/store'
import * as serviceWorker from './serviceWorker'
import './style/index.css'

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// need to sign in anonymously so that guest can create lists without app crashing
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(fetchCollectionIds(user.uid))
  } else {
    firebase.auth().signInAnonymously()
  }
})

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
