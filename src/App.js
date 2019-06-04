import React from 'react'
import './App.css'
import { firestoreConnect, withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'

function App () {
  return (
    <div className='App'>
      <AuthenticationButton />
    </div>
  )
}

export default compose(
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid
      // subcollections: [
      //   {
      //     collection: 'itemCollections',
      //     doc: , // props.collectionId
      //     subcollections: [
      //       {
      //         collection: 'items'
      //       }
      //     ]
      //   }
      // ]
    }
  ]),
  withFirebase,
  connect(state => {
    return {
      uid: state.firebase.auth.uid // uid passed as props.uid
    }
  })
)(App)
