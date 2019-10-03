import React, { useState } from 'react'
import { addItem } from '../firebase/collectionFunctions'

const NewItem = ({ uid, collectionId, length }) => {
  const [text, updateText] = useState('')

  const handleBlur = () => {
    const item = text.trim()
    if (item) addItem(uid, collectionId, item, length)
    updateText('')
  }

  const handleChange = e => {
    updateText(e.currentTarget.value)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleBlur()
  }

  return (
    <div>
      <input
        className='addItem'
        type='text'
        placeholder='add new item'
        value={text}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex='100'
        autoFocus />
    </div>
  )
}

export default NewItem
