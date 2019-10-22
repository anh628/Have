import useSubCollectionSnapshot from '../hooks/useSubCollectionSnapshot'
import { updateItemIndexes } from '../firebase/collectionFunctions'
import { toggleModalStatus } from '../actions/actionCreator'
import SingleCollectionView from './SingleCollectionView'
import Modal from 'react-responsive-modal'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

const SingleCollectionModalView = ({
  open,
  uid,
  collectionId,
  orderedItems,
  updateOrderedItems,
  ...restProps
}) => {
  const dispatch = useDispatch()
  const [items, loading] = useSubCollectionSnapshot(uid, collectionId)

  const onClose = () => {
    dispatch(toggleModalStatus(collectionId))
    return updateItemIndexes(uid, collectionId, orderedItems)
  }

  // make sure changes are reflected
  useEffect(() => {
    if (orderedItems.length < items.length) {
      const newItems = orderedItems
      newItems.push(items[items.length - 1])
      updateOrderedItems(newItems)
    } else if (orderedItems.length > items.length) {
      updateOrderedItems(
        orderedItems.filter(
          _item => items.findIndex(item => _item.itemId === item.itemId) !== -1
        )
      )
    } else if (orderedItems.length === items.length) {
      const newItems = orderedItems.map((item, index) => ({
        ...items.find(_item => _item.itemId === item.itemId),
        index
      }))
      updateOrderedItems(newItems)
    }
    // eslint-disable-next-line
  }, [loading, items])

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
