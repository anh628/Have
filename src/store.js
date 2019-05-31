import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import { firebase } from './firebase/fb'
import rootReducer from './reducers/rootreducer'
import { createStore, applyMiddleware, compose } from 'redux'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, {}), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore)


export const store = createStoreWithFirebase(
    rootReducer,
    {}, // persistedState, 
    composeEnhancers(applyMiddleware(thunk))
)