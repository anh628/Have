import React from 'react'
import './App.css'
import { firestoreConnect, withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import NewCollection from './components/NewCollection'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <NewCollection />
      </header>
    </div>
  )
}

export default compose(
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid
    }
  ]),
  withFirebase,
  connect(state => {
    return {
      uid: state.firebase.auth.uid // uid passed as props.uid
    }
  })
)(App)
