import React from 'react'
import { toggleItem } from '../firebase/collectionFunctions'
import { connect } from 'react-redux'
import { toggleModalStatus } from '../actions/actionCreator'

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
      <input
        type='checkbox'
        checked={isComplete}
        onChange={() => toggleItem(uid, collectionId, itemId)} />
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
