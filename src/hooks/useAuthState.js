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
// TODO: figure out error
const useAuthState = auth => {
  const [user, setUser] = useState(auth.currentUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(() => {
      setUser(auth.currentUser)
      setLoading(false)
    })

    return () => {
      listener()
    }
  }, [auth])
  return [getUserInfo(user), loading, auth.Error]
}

export default useAuthState
