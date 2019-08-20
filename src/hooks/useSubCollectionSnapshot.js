import { useState, useEffect, useReducer } from 'react'
import { getItemCollectionRef } from '../firebase/firebase'

// TODO double check how you get the error
// grab list of a single collection's items
const useSubCollectionSnapshot = (uid, collectionId) => {
  const [loading, setLoading] = useState(true)

  const [list, dispatch] = useReducer((state, action) => {
    const items = state.length > 0 ? [...state] : []

    switch (action.type) {
      case 'added':
        items.push(action.listInfo)
        return items
      case 'modified':
        return items.map(item =>
          item.id === action.id ? { ...action.listInfo } : item
        )
      case 'removed':
        return items.filter(item => item.id !== action.listInfo.id)
      default:
    }
  }, [])

  useEffect(() => {
    if (uid) {
      const listener = getItemCollectionRef(uid, collectionId)
        .orderBy('timeStamp')
        .onSnapshot(querySnapshot => {
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
        })

      setLoading(false)

      return () => {
        listener()
      }
    }
  }, [collectionId])

  return [list, loading]
}

export default useSubCollectionSnapshot
