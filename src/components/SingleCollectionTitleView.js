import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import { editTitle } from '../firebase/collectionFunctions'
import useToggle from '../hooks/useToggle'

const EditCollectionTitle = ({ uid, collectionId, title }) => {
  const [titleInput, editTitleInput] = useState(title)
  const [edit, toggleEdit] = useToggle(false)

  const error = () => {
    message.error('You must name your list.')
  }

  useEffect(() => {
    if (edit) editTitleInput(title)
  }, [edit])

  const handleBlur = () => {
    editTitleInput(titleInput.trim())
    if (titleInput) {
      editTitle(uid, collectionId, titleInput)
      toggleEdit()
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
          value={titleInput}
          onBlur={handleBlur}
          onChange={e => {
            editTitleInput(e.currentTarget.value)
          }}
          onKeyDown={e => {
            if (e.key === 'Escape') editTitleInput(title)
            if (e.key === 'Enter') handleBlur()
          }}
          autoFocus />
      </h1>
    )
  } else {
    return (
      <h1 className='titleCollectionView' onClick={toggleEdit}>
        {title}
      </h1>
    )
  }
}

export default EditCollectionTitle
