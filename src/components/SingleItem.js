import React, { useState } from 'react'
import {
  editItem,
  deleteItem,
  toggleItem
} from '../firebase/collectionFunctions'
import { Icon } from 'antd'

// Display items in the modal view (single collection)
const SingleItem = ({ uid, collectionId, itemId, text, isComplete }) => {
  const [newText, updateText] = useState(text)
  const [isEditing, toggleEdit] = useState(false)

  const handleBlur = () => {
    updateText(newText.trim())
    if (newText) {
      editItem(uid, collectionId, itemId, newText)
    } else {
      deleteItem(uid, collectionId, itemId)
    }
    toggleEdit(false)
  }

  let editItemDisplay = (
    <input
      className='addItem'
      onBlur={handleBlur}
      type='text'
      onChange={e => updateText(e.currentTarget.value)}
      onKeyDown={e => {
        if (e.key === 'Enter') handleBlur()
      }}
      value={newText}
      autoFocus />
  )
  let itemDisplay = (
    <div className='ItemCollectionView' id='flex'>
      {isComplete ? (
        <Icon
          type='check-square'
          onClick={() => toggleItem(uid, collectionId, itemId)}
          style={{ paddingRight: '5px' }} />
      ) : (
        <Icon
          type='border'
          onClick={() => toggleItem(uid, collectionId, itemId)}
          style={{ paddingRight: '5px' }} />
      )}
      <p
        className='collection-list-item'
        onClick={() => toggleEdit(true)}
        style={{
          textDecoration: isComplete ? 'line-through' : 'none'
        }}>
        {newText}
      </p>
      <label
        className='deleteButton'
        onClick={() => deleteItem(uid, collectionId, itemId)}>
        <Icon type='delete' />
      </label>
    </div>
  )

  if (isEditing) {
    return editItemDisplay
  } else {
    return itemDisplay
  }
}

export default SingleItem
