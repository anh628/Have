import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import NewCollection from './components/NewCollection'
import List from './components/List'

const App = ({ uid }) => {
  return (
    <div className='App'>
      <AuthenticationButton />
      {/* <header className='App-header'>
        <NewCollection uid={uid} />
      </header> */}
      <List uid={uid} />
    </div>
  )
}

export default connect(state => ({
  uid: state.firebase.auth.uid
}))(App)
