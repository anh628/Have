import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk)

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(middleware)
)
