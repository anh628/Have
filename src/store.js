import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import { firebase } from './firebase/firebase'
import rootReducer from './reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// react-redux-firebase options
const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  attachAuthIsReady: true, // attaches auth is ready promise to store
  useFirestoreForProfile: true // use firestore instead of firebase
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument, {} is for the react-redux-firebase config
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// logger prints to the console
const middleware = applyMiddleware(thunk, logger)
// Add reactReduxFirebase enhancer when making store creator
export const store = createStoreWithFirebase(
  rootReducer,
  {}, //  <- initial state , persistedState
  //  composeEnhancers(applyMiddleware(thunk)) // <- for redux dev tools
  composeWithDevTools(middleware)
)
