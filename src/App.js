import React from 'react'
import './App.css'
import { withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import List from './components/List'

const App = ({ uid }) => {
  return (
    <div className='App'>
      <AuthenticationButton />
      <List uid={uid} />
    </div>
  )
}

export default compose(
  withFirebase,
  connect(state => ({
    uid: state.firebase.auth.uid
  }))
)(App)
