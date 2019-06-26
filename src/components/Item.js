import React from 'react'
import { toggleItem } from '../firebase/collectionFunctions'
import { connect } from 'react-redux'
import { toggleModalStatus } from '../actions/actionCreator'
import { Icon } from 'antd'

const Item = ({
  uid,
  collectionId,
  itemId,
  text,
  isComplete,
  toggleModalStatus
}) => (
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
      className='item-text'
      style={{
        textDecoration: isComplete ? 'line-through' : 'none'
      }}
      onClick={() => toggleModalStatus(collectionId)}>
      {text}
    </p>
  </div>
)

const mapDispatchToProps = {
  toggleModalStatus
}

export default connect(
  null,
  mapDispatchToProps
)(Item)
