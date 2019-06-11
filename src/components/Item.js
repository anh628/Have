import React from 'react'
import { toggleItem } from '../firebase/collectionFunctions'
import ModalView from './ModalView'
import CollectionView from './CollectionView'

const Item = ({ uid, collectionId, itemId, text, isComplete, color }) => (
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
      }}
      onClick={() => this.openModal()}>
      {text}
    </label>
    <ModalView
      open={false}
      collectionColor={color}
      componentDisplay={
        <CollectionView uid={uid} collectionId={collectionId} />
      } />
  </div>
)

export default Item
