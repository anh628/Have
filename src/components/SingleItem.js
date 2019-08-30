import React, { useState } from 'react'
import {
  editItem,
  deleteItem,
  toggleItem
} from '../firebase/collectionFunctions'
<<<<<<< HEAD
import useToggle from '../hooks/useToggle'
=======
>>>>>>> master1
import { Icon } from 'antd'

// Display items in the modal view (single collection)
const SingleItem = ({ uid, collectionId, itemId, text, isComplete }) => {
  const [newText, updateText] = useState(text)
<<<<<<< HEAD
  const [isEditing, toggleEdit] = useToggle(false)
=======
  const [isEditing, toggleEdit] = useState(false)
>>>>>>> master1

  const handleBlur = () => {
    updateText(newText.trim())
    if (newText) {
      editItem(uid, collectionId, itemId, newText)
    } else {
      deleteItem(uid, collectionId, itemId)
    }
<<<<<<< HEAD
    toggleEdit()
=======
    toggleEdit(false)
>>>>>>> master1
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
          style={{ paddingRight: '5px', position: 'absolute', left: '0' }} />
      ) : (
        <Icon
          type='border'
          onClick={() => toggleItem(uid, collectionId, itemId)}
          style={{ paddingRight: '5px', position: 'absolute', left: '0' }} />
      )}
      <p
        className='collection-list-item'
<<<<<<< HEAD
        onClick={toggleEdit}
=======
        onClick={() => toggleEdit(true)}
>>>>>>> master1
        style={{
          textDecoration: isComplete ? 'line-through' : 'none'
        }}>
        {newText}
      </p>
      <label
        className='deleteButton'
        onClick={() => deleteItem(uid, collectionId, itemId)}>
        <Icon type='delete' style={{ position: 'absolute', right: '0' }} />
      </label>
    </div>
  )

  if (isEditing) return editItemDisplay

  return itemDisplay
}

export default SingleItem
