import React from 'react'
import Emoji from './Emoji'

const Item = ({ text, isComplete }) => (
  <div id='flex' className='item-row'>
    <label className={isComplete ? 'checkbox-completed' : 'checkbox'}>
      <input type='checkbox' defaultChecked={isComplete} />
    </label>
    <label
      style={{
        textDecoration: isComplete ? 'line-through' : 'none'
      }}>
      {text}
    </label>
    <button className='destroy'>
      <Emoji symbol='🗑' label='trashCan' />
    </button>
  </div>
)

export default Item
