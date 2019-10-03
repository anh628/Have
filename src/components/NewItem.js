import { addItem } from '../firebase/collectionFunctions'
import React, { useState } from 'react'

const NewItem = ({ uid, collectionId, index }) => {
  const [text, updateText] = useState('')

  const handleBlur = () => {
    const item = text.trim()
    if (item) addItem(uid, collectionId, item, index)
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
