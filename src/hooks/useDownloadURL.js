import { useState, useEffect } from 'react'
import { storage } from '../firebase/firebase'

// TODO double check how you get the error
// grab list of a single collection's items
const useDownloadURL = (uid, collectionId) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [downloadURL, setDownloadURL] = useState(null)

  useEffect(() => {
    if (uid && collectionId) {
      storage
        .ref(`${uid}/${collectionId}/cover`)
        .getDownloadURL()
        .then(url => setDownloadURL(url))
        .catch(e => setError(e))
    }
    setLoading(false)
  }, [uid, collectionId])

  return [downloadURL, loading, error]
}

export default useDownloadURL
