import React from 'react'
import { toggleItem } from '../firebase/collectionFunctions'
import { useDispatch } from 'react-redux'
import { toggleModalStatus } from '../actions/actionCreator'
import { Icon } from 'antd'

const Item = ({ uid, collectionId, itemId, text, isComplete }) => {
  const dispatch = useDispatch()
  return (
    <div id='flex' className='item-row'>
      <label className={isComplete ? 'checkbox-completed' : 'checkbox'}>
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
      </label>
      <p
        id='list-view'
        className='collection-list-item'
        style={{
          textDecoration: isComplete ? 'line-through' : 'none'
        }}
        onClick={() => dispatch(toggleModalStatus(collectionId))}>
        {text}
      </p>
    </div>
  )
}

export default Item
