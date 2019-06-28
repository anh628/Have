import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'

function AuthenticationButton ({ firebase, auth, isAnonymous }) {
  function loginWithGoogle () {
    return firebase.login({ provider: 'google', type: 'popup' })
  }
  function logout () {
    return firebase.logout()
  }
  return (
    <div>
      {!isLoaded(auth) ? (
        <span>Loading...</span>
      ) : isAnonymous ? (
        <button onClick={loginWithGoogle}>Login With Google</button>
      ) : (
        <div>
          <button style={{ width: '20rem' }} onClick={logout}>
            {' '}
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

AuthenticationButton.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  withFirebase,
  connect(state => {
    return {
      auth: state.firebase.auth, // auth passed as props.auth
      isAnonymous: state.firebase.auth.isAnonymous
    }
  })
)(AuthenticationButton)
