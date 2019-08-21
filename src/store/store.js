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
