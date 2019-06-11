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
  color,
  open,
  toggleModalStatus
}) => (
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
      onClick={() => toggleModalStatus(collectionId)}>
      {text}
    </label>
    <ModalView
      modalId={this.props.collectionId}
      open={open}
      collectionColor={color}
      componentDisplay={
        <CollectionView uid={uid} collectionId={collectionId} />
      } />
  </div>
)

const mapStateToProps = (state, props) => ({
  open:
    state.modal.length > 0
      ? state.modal.filter(modal => modal.modalId !== props.collectionId)
      : false
})

const mapDispatchToProps = {
  toggleModalStatus
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
