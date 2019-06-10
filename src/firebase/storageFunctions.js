/* eslint-disable no-console */
import { storage, storageRef } from './firebase'

export const uploadFile = (collectionImageInputId, uid, collectionId) => {
  // get file
  const file = document.getElementById(collectionImageInputId).files[0]
  // create file name and metadata information
  const name = `${new Date()}-${file.name}`
  const metadata = { contentType: file.type }

  const imageRef = storageRef.child(`${uid}/${collectionId}/${name}`)

  // upload file to firebase storage under user's folder

  return imageRef
    .put(file, metadata)
    .then(snapshot => snapshot.ref.getDownloadURL())
}

export const deleteFile = imageUrl => {
  const httpsRef = storage.refFromURL(imageUrl)
  return httpsRef.delete().catch(error => console.log(error))
}
