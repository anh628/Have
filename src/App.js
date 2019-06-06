import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import AddBar from './components/addBar'
import List from './components/List'

const App = ({ uid }) => {
  return (
    <div className='App'>
      <AuthenticationButton />
      <header className='App-header'>
        <AddBar />
      </header>
      <List uid={uid} />
    </div>
  )
}

export default connect(state => ({
  uid: state.firebase.auth.uid // uid passed as props.uid
}))(App)
