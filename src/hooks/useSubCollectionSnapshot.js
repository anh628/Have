import { usersCollectionRef } from '../firebase/firebase'
import { useState, useEffect, useReducer, useCallback } from 'react'
import { orderBy } from 'lodash'

// grab list of a single collection's items
const useSubCollectionSnapshot = (uid, collectionId) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const createReducer = () => {
    return (state, action) => {
      const items = state.length > 0 ? [...state] : []

      switch (action.type) {
        case 'added':
          items.push(action.listInfo)
          return items
        case 'modified':
          const newItems = items.map(item =>
            item.itemId === action.listInfo.itemId
              ? { ...action.listInfo }
              : item
          )
          return orderBy(newItems, 'index', 'asc')
        case 'removed':
          return items.filter(item => item.itemId !== action.listInfo.itemId)
        default:
      }
    }
  }

  const memoizedReducer = useCallback(createReducer(), [])

  const [list, dispatch] = useReducer(memoizedReducer, [])

  useEffect(() => {
    if (uid) {
      const unsubscribe = usersCollectionRef
        .doc(uid)
        .collection('itemCollections')
        .doc(collectionId)
        .collection('items')
        .orderBy('index')
        .onSnapshot(
          querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
              const listInfo = { ...change.doc.data() }

              if (change.type === 'added') {
                dispatch({ type: 'added', listInfo })
              }
              if (change.type === 'modified') {
                dispatch({
                  type: 'modified',
                  listInfo
                })
              }
              if (change.type === 'removed') {
                dispatch({ type: 'removed', listInfo })
              }
            })
            setLoading(false)
          },
          error => setError(error)
        )

      return () => {
        unsubscribe()
      }
    }
  }, [uid, collectionId])

  return [list, loading, error]
}

export default useSubCollectionSnapshot
