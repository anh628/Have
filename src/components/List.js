import React from 'react'
import ItemCollection from './ItemCollection'

const List = ({ uid, collectionList }) => {
  return (
    <div>
      {collectionList &&
        collectionList.map(collection => (
          <ItemCollection key={collection.id} uid={uid} {...collection} />
        ))}
    </div>
  )
}

export default List
