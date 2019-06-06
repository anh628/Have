import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
// import GoogleButton from 'react-google-button' // optional

// http://react-redux-firebase.com/docs/recipes/auth.html

function AuthenticationButton ({ firebase, auth }) {
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
      ) : isEmpty(auth) ? (
        // <GoogleButton/> button can be used instead
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
      auth: state.firebase.auth // auth passed as props.auth
    }
  })
)(AuthenticationButton)
