import { useState, useEffect, useReducer } from 'react'
import { usersCollectionRef } from '../firebase/firebase'

// TODO double check how you get the error
// grab list of a single collection's items
const useSubCollectionSnapshot = (uid, collectionId) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [list, dispatch] = useReducer((state, action) => {
    const items = state.length > 0 ? [...state] : []

    switch (action.type) {
      case 'added':
        items.push(action.listInfo)
        return items
      case 'modified':
        return items.map(item =>
          item.itemId === action.listInfo.itemId ? { ...action.listInfo } : item
        )
      case 'removed':
        return items.filter(item => item.itemId !== action.listInfo.itemId)
      default:
    }
  }, [])

  useEffect(() => {
    if (uid) {
      const unsubscribe = usersCollectionRef
        .doc(uid)
        .collection('itemCollections')
        .doc(collectionId)
        .collection('items')
        .orderBy('timeStamp')
        .onSnapshot(
          querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
              const listInfo = { ...change.doc.data() }

              if (change.type === 'added') {
                dispatch({ type: 'added', listInfo })
              }
              if (change.type === 'modified') {
                dispatch({ type: 'modified', listInfo })
              }
              if (change.type === 'removed') {
                dispatch({ type: 'removed', listInfo })
              }
            })
          },
          error => setError(error)
        )

      setLoading(false)
      return () => {
        unsubscribe()
      }
    }
  }, [uid, collectionId])

  return [list, loading, error]
}

export default useSubCollectionSnapshot
