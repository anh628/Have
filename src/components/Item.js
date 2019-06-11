import React from 'react'
import { toggleItem } from '../firebase/collectionFunctions'

const Item = ({ uid, collectionId, itemId, text, isComplete }) => (
  <div id='flex' className='item-row'>
    <label className={isComplete ? 'checkbox-completed' : 'checkbox'}>
      <input
        type='checkbox'
        checked={isComplete}
        onChange={() => toggleItem(uid, collectionId, itemId)} />
    </label>
    <label
      style={{
        textDecoration: isComplete ? 'line-through' : 'none'
      }}>
      {text}
    </label>
  </div>
)

export default Item
