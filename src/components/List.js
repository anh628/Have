import React from 'react'
import ItemCollection from './ItemCollection'
import { message } from 'antd'

const List = ({ uid, isAnonymous, collectionList }) => {
  const info = () => {
    message.info('Log in to save your list', 5)
  }

  message.config({
    top: 30,
    duration: 2,
    maxCount: 3
  })

  if (isAnonymous) info()

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
