import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { store } from './store'
// import PropPrint from './components/DummyPropsPrinter/PropPrint'
import App from './App'
import { Provider } from 'react-redux'
import { firebase } from './firebase/firebase'
import { fetchCollectionIds } from './firebase/collectionFunctions'

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

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(fetchCollectionIds(user.uid))
  }
})
