import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SingleCollectionTitleView from './SingleCollectionTitleView'
import { deleteImage } from '../firebase/collectionFunctions'
import { deleteFile } from '../firebase/storageFunctions'
import React, { useEffect, useCallback } from 'react'
import { reorder } from '../utils/functions'
import useToggle from '../hooks/useToggle'
import SingleItem from './SingleItem'
import { Icon, Card } from 'antd'
import NewItem from './NewItem'
import Footer from './Footer'
import { omit } from 'lodash'

const SingleCollectionView = ({
  uid,
  id: collectionId,
  collectionColor,
  image,
  title,
  items,
  loading,
  orderedItems,
  updateOrderedItems,
  syncWithFirestore
}) => {
  const [loadingImage, toggleLoadingImage] = useToggle(false)
  const uncheckedItems =
    items && items.filter(item => !item.isComplete).length > 0

  const checkItems = items && items.filter(item => item.isComplete).length > 0
  const itemIds = items.map(x => x.itemId)

  useEffect(() => {
    if (!loading) {
      const newList = items.map(item => omit(item, 'index'))
      orderedItems.length === 0
        ? updateOrderedItems(items)
        : updateOrderedItems(
          orderedItems.map(item => ({
            index: item.index,
            ...newList[itemIds.indexOf(item.itemId)]
          }))
        )
    }
    // eslint-disable-next-line
  }, [loading, items])

  const onDragEnd = useCallback(
    async e => {
      const { destination, source } = e
      // dropped outside the list
      if (!destination || source.index === destination.index) {
        return
      }
      if (source.droppableId === destination.droppableId) {
        const newList = reorder(orderedItems, source.index, destination.index)
        updateOrderedItems(newList)
      }
    },
    // eslint-disable-next-line
    [orderedItems]
  )

  const listItem = orderedItems && (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable' type='list'>
        {provided => (
          <div ref={provided.innerRef}>
            {orderedItems.map((item, index) => (
              <Draggable
                key={item.itemId}
                draggableId={item.itemId}
                index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <SingleItem
                      key={item.itemId}
                      uid={uid}
                      collectionId={collectionId}
                      {...item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )

  const displayImage = image && (
    <div className='coverart'>
      {loadingImage ? (
        <Icon type='loading' />
      ) : (
        <div>
          <img src={image} alt='cover-art' />
          <Icon
            type='delete'
            className='deleteImage'
            onClick={() => {
              deleteFile(image)
              deleteImage(uid, collectionId)
            }} />
        </div>
      )}
    </div>
  )

  const description = (
    <div>
      {loading ? (
        <Icon
          type='loading'
          style={{
            fontSize: '20px',
            position: 'absolute',
            left: '50%',
            top: '30%'
          }} />
      ) : (
        listItem
      )}
      <NewItem collectionId={collectionId} uid={uid} />
    </div>
  )

  return (
    <Card
      className='collection-view'
      hoverable
      style={{ width: 500, backgroundColor: collectionColor }}
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
          modalView={true}
          itemIds={itemIds}
          toggleLoadingImage={toggleLoadingImage}
          syncWithFirestore={syncWithFirestore} />
      ]}>
      <Card.Meta
        title={
          <SingleCollectionTitleView
            uid={uid}
            collectionId={collectionId}
            title={title} />
        }
        description={description} />
    </Card>
  )
}

export default SingleCollectionView
