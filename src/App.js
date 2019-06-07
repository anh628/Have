import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import NewCollection from './components/NewCollection'

const App = ({ uid }) => {
  return (
    <div className='App'>
      <header className='App-header'>
        <NewCollection />
      </header>
    </div>
  )
}

export default connect(state => ({
  uid: state.firebase.auth.uid // uid passed as props.uid
}))(App)
