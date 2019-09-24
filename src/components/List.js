import { updateCollectionIndexes } from '../firebase/collectionFunctions'
import { ListManager } from 'react-beautiful-dnd-grid'
import React, { useCallback, useState } from 'react'
import ItemCollection from './ItemCollection'
import { reorder } from '../utils/functions'
import { Spin } from 'antd'

const List = ({ uid, collectionList }) => {
  const [dragLoading, setDragLoading] = useState(false)

  const onDragEnd = useCallback(async (sourceIndex, destinationIndex) => {
    if (sourceIndex === destinationIndex) return
    setDragLoading(true)

    const newList = reorder(collectionList, sourceIndex, destinationIndex)

    await updateCollectionIndexes(uid, collectionList, newList)
    setDragLoading(false)
  })

  if (dragLoading) {
    return (
      <Spin
        size='large'
        style={{
          fontSize: '20px',
          position: 'absolute',
          left: '50%'
        }} />
    )
  }

  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      {collectionList && (
        <ListManager
          items={collectionList}
          direction='horizontal'
          maxItems={3}
          render={collection => (
            <ItemCollection key={collection.id} uid={uid} {...collection} />
          )}
          onDragEnd={onDragEnd} />
      )}
    </div>
  )
}

export default List
