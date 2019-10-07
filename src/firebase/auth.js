import { getItemCollectionRef, getItemRef } from './collectionFunctions'
import { firebase, usersCollectionRef } from './firebase'

// get user's information
export const getUserInfo = user => {
  return {
    uid: user.user.uid,
    name: user.additionalUserInfo.profile.name,
    email: user.additionalUserInfo.profile.email,
    picture: user.additionalUserInfo.profile.picture
  }
}

/*
firebase action
Log user into firebase by signing into Google and linking it to the anonymous user's information
1) User started off as anonymous
2) User signed into Google
3) Check to see if Google account was used before
4) If new, link the two accounts
5a) If not, merge the two accounts by moving information from previous account into the current account
5b) Delete prev account's information
6) push uid to router
*/
export const login = () => {
  const currentUser = firebase.auth().currentUser

  // if new user
  return currentUser
    .linkWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(googleUser => {
      const userInfo = getUserInfo(googleUser)
      return usersCollectionRef.doc(userInfo.uid).set(userInfo)
      // .then(() => history.push(`/user/${googleUser.user.uid}/`))
    }) // user already exists
    .catch(existingUser => {
      // Sign in user with the google account we attempted to link earlier
      firebase
        .auth()
        .signInWithCredential(existingUser.credential)
        .then(existingUser => {
          const userInfo = getUserInfo(existingUser)

          // get the itemCollections of current anon user
          const currentUserCollectionRef = usersCollectionRef
            .doc(currentUser.uid)
            .collection('itemCollections')

          // loop through itemCollection of current anon user and add them to the existing user
          currentUserCollectionRef.get().then(itemCollection => {
            itemCollection.forEach(collectionId => {
              const collectionInfo = { ...collectionId.data() }
              // set item collection info

              getItemCollectionRef(userInfo.uid, collectionId.id).set(
                collectionInfo
              )
              // get items in the collection current user then add it to existing user
              getItemCollectionRef(currentUser.uid, collectionId.id)
                .collection('items')
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    const item = { ...doc.data() }
                    getItemRef(userInfo.uid, collectionId.id, item.id).set(item)
                  })
                })
            })
          })

          usersCollectionRef.doc(userInfo.uid).set(userInfo)

          return currentUser
            .delete() // delete current anon user
            .then(() => {
              // sign in
              return firebase
                .auth()
                .signInWithCredential(existingUser.credential)
            })
        })
    })
    .catch(error => {
      return error
    })
}

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => firebase.auth().signInAnonymously())
}
