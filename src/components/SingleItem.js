import React, { useState } from 'react'
import {
  editItem,
  deleteItem,
  toggleItem
} from '../firebase/collectionFunctions'
import useToggle from '../hooks/useToggle'
import { Icon, Tooltip } from 'antd'
import { Draggable } from 'react-beautiful-dnd'

// Display items in the modal view (single collection)
const SingleItem = ({
  uid,
  collectionId,
  itemId,
  text,
  isComplete,
  dragIndex
}) => {
  const [newText, updateText] = useState(text)
  const [isEditing, toggleEdit] = useToggle(false)

  const handleBlur = () => {
    updateText(newText.trim())
    if (newText) {
      editItem(uid, collectionId, itemId, newText)
    } else {
      deleteItem(uid, collectionId, itemId)
    }
    toggleEdit()
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
    <Draggable key={itemId} draggableId={itemId} index={dragIndex}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div className='ItemCollectionView' id='flex'>
            <Tooltip title='Click to drag item' placement='top'>
              <Icon
                type='pause'
                {...provided.dragHandleProps}
                style={{
                  paddingRight: '5px',
                  position: 'absolute',
                  left: '0',
                  cursor: 'grab'
                }} />
            </Tooltip>
            {isComplete ? (
              <Icon
                type='check-square'
                onClick={() => toggleItem(uid, collectionId, itemId)}
                style={{ position: 'absolute', left: '15px' }} />
            ) : (
              <Icon
                type='border'
                onClick={() => toggleItem(uid, collectionId, itemId)}
                style={{ position: 'absolute', left: '15px' }} />
            )}
            <p
              className='collection-list-item'
              onClick={toggleEdit}
              style={{
                textDecoration: isComplete ? 'line-through' : 'none'
              }}>
              {newText}
            </p>
            <label
              className='deleteButton'
              onClick={() => deleteItem(uid, collectionId, itemId)}>
              <Icon
                type='delete'
                style={{ position: 'absolute', right: '0' }} />
            </label>
          </div>
        </div>
      )}
    </Draggable>
  )

  if (isEditing) return editItemDisplay

  return itemDisplay
}

export default SingleItem
