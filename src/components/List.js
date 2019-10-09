import { updateCollectionIndexes } from '../firebase/collectionFunctions'
import React, { useCallback, useState, useEffect } from 'react'
import { ListManager } from 'react-beautiful-dnd-grid'
import useDebounce from '../hooks/useDebounce'
import ItemCollection from './ItemCollection'
import { reorder } from '../utils/functions'

const List = ({ uid, collectionList }) => {
  const [orderCollection, updateOrderCollection] = useState(collectionList)

  const debouncedOrderCollection = useDebounce(
    orderCollection => {
      updateCollectionIndexes(uid, orderCollection)
    },
    5000,
    { maxWait: 10000, trailing: true }
  )

  // make sure any changes outside of order is being reflected
  useEffect(() => {
    const collectionIds = collectionList.map(collection => collection.id)
    if (orderCollection.length === collectionList.length) {
      const newList = orderCollection.map((collection, index) => ({
        index,
        ...collectionList[collectionIds.indexOf(collection.id)]
      }))
      updateOrderCollection(newList)
    }
    // if you add a new list
    if (collectionList.length > orderCollection.length) {
      updateOrderCollection([
        ...orderCollection,
        collectionList[collectionList.length - 1]
      ])
    }
    // if you delete an item
    if (collectionList.length < orderCollection.length) {
      updateOrderCollection(
        orderCollection.filter(collection =>
          collectionIds.includes(collection.id)
        )
      )
    }
    // eslint-disable-next-line
  }, [collectionList])

  const onDragEnd = useCallback(
    async (sourceIndex, destinationIndex) => {
      if (sourceIndex === destinationIndex) return
      const newList = reorder(orderCollection, sourceIndex, destinationIndex)
      updateOrderCollection(newList)
      debouncedOrderCollection(newList)
    },
    [orderCollection, debouncedOrderCollection]
  )

  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      {orderCollection && (
        <ListManager
          items={orderCollection}
          direction='horizontal'
          maxItems={4}
          render={collection => (
            <ItemCollection key={collection.id} uid={uid} {...collection} />
          )}
          onDragEnd={onDragEnd} />
      )}
    </div>
  )
}

export default List
