/* eslint-disable no-console */
import { storage, storageRef } from './firebase'

export const uploadFile = (collectionImageInputId, uid, collectionId) => {
  // get file
  const file = document.getElementById(collectionImageInputId).files[0]
  // create file name and metadata information

  const metadata = { contentType: file.type }

  const imageRef = storageRef.child(`${uid}/${collectionId}/cover`)

  // upload file to firebase storage under user's folder

  return imageRef
    .put(file, metadata)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .catch(error => console.log(error))
}

export const deleteFile = imageUrl => {
  if (imageUrl.indexOf('https://firebasestorage.googleapis.com/') === 0) {
    const httpsRef = storage.refFromURL(imageUrl)
    return httpsRef.delete().catch(error => console.log(error))
  } else return null
}
