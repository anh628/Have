import useSubCollectionSnapshot from '../hooks/useSubCollectionSnapshot'
import { updateItemIndexes } from '../firebase/collectionFunctions'
import { toggleModalStatus } from '../actions/actionCreator'
import SingleCollectionView from './SingleCollectionView'
import Modal from 'react-responsive-modal'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'

const SingleCollectionModalView = ({
  open,
  uid,
  collectionId,
  ...restProps
}) => {
  const dispatch = useDispatch()
  const [items, loading] = useSubCollectionSnapshot(uid, collectionId)
  const [orderedItems, updateOrderedItems] = useState([])

  const onClose = () => {
    return updateItemIndexes(uid, collectionId, items, orderedItems).then(() =>
      dispatch(toggleModalStatus(collectionId))
    )
  }

  return (
    <Modal
      closeOnOverlayClick
      closeOnEsc
      center
      open={open}
      styles={{
        modal: {
          backgroundColor: 'transparent'
        }
      }}
      // escape button
      onClose={() => onClose()}
      showCloseIcon={false}
      focusTrapped={true}
      focusTrapOptions={{ returnFocusOnDeactivate: true }}>
      <SingleCollectionView
        uid={uid}
        collectionId={collectionId}
        items={items}
        loading={loading}
        orderedItems={orderedItems}
        updateOrderedItems={updateOrderedItems}
        {...restProps}
        onClose={onClose} />
    </Modal>
  )
}

export default SingleCollectionModalView
