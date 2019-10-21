import useSubCollectionSnapshot from '../hooks/useSubCollectionSnapshot'
import { toggleModalStatus } from '../actions/actionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import useToggle from '../hooks/useToggle'
import { Icon, Card } from 'antd'
import Footer from './Footer'
import React from 'react'
import Item from './Item'

const ItemCollection = ({
  uid,
  id: collectionId,
  collectionColor,
  image,
  title,
  dragIndex
}) => {
  // move data fetching outside?
  const [items, loading] = useSubCollectionSnapshot(uid, collectionId) // how to prevent this from rerendering

  const [loadingImage, toggleLoadingImage] = useToggle(false)
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

  const displayImage = (
    <div className='coverart'>
      {loadingImage ? (
        <Icon type='loading' />
      ) : (
        image && (
          <img
            src={image}
            alt='cover-art'
            onClick={() => dispatch(toggleModalStatus(collectionId))} />
        )
      )}
    </div>
  )

  const uncheckedItems = items
    ? items.filter(item => !item.isComplete).length > 0
    : null
  const checkItems = items
    ? items.filter(item => item.isComplete).length > 0
    : null

  const itemIds = items.map(x => x.itemId)

  if (open) {
    return (
      <div
        style={{
          width: '316px',
          height: '1px',
          display: 'inline-block'
        }}></div>
    )
  }

  return (
    <Draggable key={collectionId} draggableId={collectionId} index={dragIndex}>
      {(provided, snapshot) => (
        <div
          className='item-collection'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
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
                collectionColor={collectionColor}
                itemIds={itemIds}
                toggleLoadingImage={toggleLoadingImage} />
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
        </div>
      )}
    </Draggable>
  )
}

export default React.memo(ItemCollection)
