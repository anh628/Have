import { useState, useEffect } from 'react'
import { firebase } from '../firebase/firebase'

export const getUserInfo = user => {
  const displayName =
    user &&
    user.providerData &&
    user.providerData[0] &&
    user.providerData[0].displayName
  const photoURL =
    user &&
    user.providerData &&
    user.providerData[0] &&
    user.providerData[0].photoURL

  return {
    uid: user && user.uid,
    isAnonymous: user && user.isAnonymous,
    displayName,
    photoURL,
    email: user && user.email
  }
}

const useAuthState = () => {
  const [user, setUser] = useState(firebase.auth().currentUser)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(
      () => {
        setUser(firebase.auth().currentUser)
        setLoading(false)
      },
      error => setError(error)
    )

    return () => {
      listener()
    }
  }, [])
  return [getUserInfo(user), loading, error]
}

export default useAuthState
