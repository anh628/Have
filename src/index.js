import * as serviceWorker from './serviceWorker'
import { firebase } from './firebase/firebase'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './components/App'
import ReactDOM from 'react-dom'
import './style/index.css'
import React from 'react'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

firebase.auth().signInAnonymously()

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
