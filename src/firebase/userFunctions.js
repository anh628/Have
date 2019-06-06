import { usersCollectionRef, db } from "./firebase";



export const signIn = ( authResult, redirect) => {
    //uid
    //email
    //display name 
    // Sign into Firebase using popup auth & Google as the identity provider.
   
    

  }

export const  setUserInfo= ( uid , uEmail, displayName )=> {
    const userInfo = {
        uid,
        email : uEmail,
        displayName
    }
  return usersCollectionRef
  .doc(`${uid}`)
  .set(userInfo)

}

