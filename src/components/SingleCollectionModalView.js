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

  const syncWithFirestore = () => {
    updateItemIndexes(uid, collectionId, items, orderedItems)
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
      onClose={async () => {
        dispatch(toggleModalStatus(collectionId))
        await syncWithFirestore()
      }}
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
        syncWithFirestore={syncWithFirestore} />
    </Modal>
  )
}

export default SingleCollectionModalView
