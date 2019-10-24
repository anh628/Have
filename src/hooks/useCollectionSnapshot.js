import { usersCollectionRef } from '../firebase/firebase'
import { useState, useEffect, useReducer } from 'react'
import { orderBy } from 'lodash'

// grab list of user's item collections
const useCollectionSnapshot = uid => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [collections, dispatch] = useReducer((state, action) => {
    const items = state.length > 0 ? [...state] : []

    switch (action.type) {
      case 'added':
        items.push(action.collectionInfo)
        return items
      case 'modified':
        const newList = items.map(item =>
          item.id === action.collectionInfo.id
            ? { ...action.collectionInfo }
            : item
        )
        return orderBy(newList, 'index', 'asc')
      case 'removed':
        return items.filter(item => item.id !== action.collectionInfo.id)
      case 'clear_all':
        return []
      default:
    }
  }, [])

  useEffect(() => {
    if (uid) {
      const unsubscribe = usersCollectionRef
        .doc(uid)
        .collection('itemCollections')
        .orderBy('index')
        .onSnapshot(
          querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
              const id = change.doc.id
              const collectionInfo = { ...change.doc.data(), id }
              if (change.type === 'added') {
                dispatch({ type: 'added', collectionInfo })
              }
              if (change.type === 'modified') {
                dispatch({
                  type: 'modified',
                  collectionInfo
                })
              }
              if (change.type === 'removed') {
                dispatch({ type: 'removed', collectionInfo })
              }
            })
            setLoading(false)
          },
          error => setError(error)
        )

      return () => {
        unsubscribe()
        dispatch({ type: 'clear_all' })
      }
    }
  }, [uid])

  return [collections, loading, error]
}

export default useCollectionSnapshot
