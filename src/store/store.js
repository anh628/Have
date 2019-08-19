import { createFirestoreInstance } from 'redux-firestore'
import { firebase } from '../firebase/firebase'
import rootReducer from '../reducers/rootReducer'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk)

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(middleware)
)

const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  attachAuthIsReady: true, // attaches auth is ready promise to store
  useFirestoreForProfile: true // use firestore instead of firebase
}

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}
