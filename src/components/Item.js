import React from 'react'

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
  </div>
)

export default Item
