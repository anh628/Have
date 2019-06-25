import React from 'react'
import { toggleItem } from '../firebase/collectionFunctions'
import ModalView from './ModalView'
import CollectionView from './CollectionView'
import { connect } from 'react-redux'
import { toggleModalStatus } from '../actions/actionCreator'

const Item = ({
  uid,
  collectionId,
  itemId,
  text,
  isComplete,
  collectionColor,
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
    <ModalView
      collectionId={collectionId}
      collectionColor={collectionColor}
      onClose={() => toggleModalStatus(collectionId)}
      componentDisplay={
        <CollectionView uid={uid} collectionId={collectionId} />
      } />
  </div>
)

const mapDispatchToProps = {
  toggleModalStatus
}

export default connect(
  null,
  mapDispatchToProps
)(Item)
