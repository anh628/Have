import { combineReducers } from 'redux'
import modal from './modal'

// Add firebase to reducers
const rootReducer = combineReducers({
  modal
})

export default rootReducer
