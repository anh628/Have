import React from 'react'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'
import { toggleModalStatus } from '../actions/actionCreator'
import { Icon, Card } from 'antd'
import useSubCollectionSnapshot from '../hooks/useSubCollectionSnapshot'
import ImageButton from './ImageButton'

const ItemCollection = ({
  uid,
  id: collectionId,
  collectionColor,
  image,
  title
}) => {
  const [items, loading] = useSubCollectionSnapshot(uid, collectionId)
  const dispatch = useDispatch()
  const open = useSelector(
    state =>
      state.modal.filter(modal => modal.modalId === collectionId) &&
      state.modal.filter(modal => modal.modalId === collectionId)[0] &&
      state.modal.filter(modal => modal.modalId === collectionId)[0].open
  )
  const itemsList =
    items.length === 0 ? (
      <div onClick={() => dispatch(toggleModalStatus(collectionId))}>
        Click to add to the list
      </div>
    ) : (
      items.map(item => (
        <Item
          key={item.itemId}
          uid={uid}
          collectionId={collectionId}
          {...item}
          collectionColor={collectionColor} />
      ))
    )

  const displayImage = image && (
    <div className='coverart'>
      {image === 'loading' ? (
        <Icon type='loading' />
      ) : (
        <img
          src={image}
          alt='cover-art'
          onClick={() => dispatch(toggleModalStatus(collectionId))} />
      )}
    </div>
  )

  const uncheckedItems = items
    ? items.filter(item => !item.isComplete).length > 0
    : null
  const checkItems = items
    ? items.filter(item => item.isComplete).length > 0
    : null

  // collection won't display in list if it's open
  if (open) return null
  return (
    <Card
      className='item-collection'
      hoverable
      style={{ width: 300, backgroundColor: collectionColor }}
      cover={displayImage}
      actions={[
        <Footer
          key='footer'
          image={image}
          uid={uid}
          collectionId={collectionId}
          areItems={items.length > 0}
          uncheckedItems={uncheckedItems}
          checkItems={checkItems}
          collectionColor={collectionColor} />
      ]}>
      <Card.Meta
        title={
          <h2
            className='titleCollectionView'
            onClick={() => dispatch(toggleModalStatus(collectionId))}>
            {title}
          </h2>
        }
        description={loading ? <Icon type='loading' /> : itemsList} />
    </Card>
  )
}

export default ItemCollection
