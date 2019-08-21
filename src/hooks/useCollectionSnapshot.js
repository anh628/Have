import { useState, useEffect, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { usersCollectionRef } from '../firebase/firebase'
import { addModalId, deleteModalId } from '../actions/actionCreator'

// TODO double check how you get the error
// grab list of user's item collections
const useCollectionSnapshot = uid => {
  const [loading, setLoading] = useState(true)

  const dispatchRedux = useDispatch()
  const [collections, dispatch] = useReducer((state, action) => {
    const items = state.length > 0 ? [...state] : []

    switch (action.type) {
      case 'added':
        items.push(action.collectionInfo)
        dispatchRedux(addModalId(action.collectionInfo.id))
        return items
      case 'modified':
        return items.map(item =>
          item.id === action.id ? { ...action.collectionInfo } : item
        )
      case 'removed':
        dispatchRedux(deleteModalId(action.collectionInfo.id))
        return items.filter(item => item.id !== action.collectionInfo.id)
      default:
    }
  }, [])

  useEffect(() => {
    if (uid) {
      const listener = usersCollectionRef
        .doc(uid)
        .collection('itemCollections')
        .orderBy('timeStamp')
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            const id = change.doc.id
            const collectionInfo = { ...change.doc.data(), id }
            if (change.type === 'added') {
              dispatch({ type: 'added', collectionInfo })
            }
            if (change.type === 'modified') {
              dispatch({ type: 'modified', collectionInfo })
            }
            if (change.type === 'removed') {
              dispatch({ type: 'removed', collectionInfo })
            }
          })
        })
      setLoading(false)

      return () => {
        listener()
      }
    }
  }, [uid])

  return [collections, loading]
}

export default useCollectionSnapshot
