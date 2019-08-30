import React, { useState } from 'react'
import { message } from 'antd'
import { editTitle } from '../firebase/collectionFunctions'
<<<<<<< HEAD
import useToggle from '../hooks/useToggle'

const EditCollectionTitle = ({ uid, collectionId, title }) => {
  const [newTitle, updateTitle] = useState(title)
  const [edit, toggleEdit] = useToggle(false)
=======

const EditCollectionTitle = ({ uid, collectionId, title }) => {
  const [newTitle, updateTitle] = useState(title)
  const [edit, toggleEdit] = useState(false)
>>>>>>> master1

  const error = () => {
    message.error('You must name your list.')
  }
  const handleBlur = () => {
    updateTitle(newTitle.trim())
    if (newTitle) {
      editTitle(uid, collectionId, newTitle)
<<<<<<< HEAD
      toggleEdit()
=======
      toggleEdit(false)
>>>>>>> master1
    } else {
      error()
    }
  }

  if (edit) {
    return (
      <h1>
        <input
          className='titleCollectionView-editing'
          type='input'
          value={newTitle}
          onBlur={handleBlur}
          onChange={e => {
            updateTitle(e.currentTarget.value)
          }}
          onKeyDown={e => {
            if (e.key === 'Escape') updateTitle(title)
            if (e.key === 'Enter') handleBlur()
          }}
          autoFocus />
      </h1>
    )
  } else {
    return (
<<<<<<< HEAD
      <h1 className='titleCollectionView' onClick={toggleEdit}>
=======
      <h1 className='titleCollectionView' onClick={() => toggleEdit(true)}>
>>>>>>> master1
        {newTitle}
      </h1>
    )
  }
}

export default EditCollectionTitle
