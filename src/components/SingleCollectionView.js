import SingleCollectionTitleView from './SingleCollectionTitleView'
import { Droppable } from 'react-beautiful-dnd'
import { deleteImage } from '../firebase/collectionFunctions'
import { deleteFile } from '../firebase/storageFunctions'
import React from 'react'
import useToggle from '../hooks/useToggle'
import SingleItem from './SingleItem'
import { Icon, Card } from 'antd'
import NewItem from './NewItem'
import Footer from './Footer'

const SingleCollectionView = ({
  uid,
  id: collectionId,
  collectionColor,
  image,
  title,
  items,
  loading,
  orderedItems,
  onClose
}) => {
  const [loadingImage, toggleLoadingImage] = useToggle(false)

  const uncheckedItems =
    items && items.filter(item => !item.isComplete).length > 0

  const checkItems = items && items.filter(item => item.isComplete).length > 0
  const itemIds = items.map(x => x.itemId)

  const listItem = orderedItems && (
    <Droppable droppableId='droppable' type='list'>
      {provided => (
        <div ref={provided.innerRef}>
          {orderedItems.map((item, index) => (
            <SingleItem
              dragIndex={index}
              key={item.itemId}
              uid={uid}
              collectionId={collectionId}
              {...item} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )

  const displayImage = (
    <div className='coverart'>
      {loadingImage ? (
        <Icon type='loading' />
      ) : (
        image && (
          <div>
            <img src={image} alt='cover-art' />
            <Icon
              type='delete'
              className='deleteImage'
              onClick={() => {
                deleteFile(image)
                deleteImage(uid, collectionId)
              }}
              style={{ backgroundColor: collectionColor }} />
          </div>
        )
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
      <NewItem collectionId={collectionId} uid={uid} index={items.length} />
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
          onClose={onClose} />
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
