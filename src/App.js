import React from 'react'
import './App.css'
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

export default connect(state => ({
  uid: state.firebase.auth.uid
}))(App)
