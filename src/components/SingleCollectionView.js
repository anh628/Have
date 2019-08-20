import React, { useState } from 'react'
import { Icon } from 'antd'
import { deleteImage } from '../firebase/collectionFunctions'
import { deleteFile } from '../firebase/storageFunctions'
import EditCollectionTitle from './EditCollectionTitle'
import SingleItem from './SingleItem'
import NewItem from './NewItem'
import Footer from './Footer'
import useSubCollectionSnapshot from '../hooks/useSubCollectionSnapshot'

const SingleCollectionView = ({
  uid,
  id: collectionId,
  collectionColor,
  image,
  title
}) => {
  const [editTitle, toggleEditTitle] = useState(false)

  const [items, loading] = useSubCollectionSnapshot(uid, collectionId)

  const listItem =
    items &&
    items.map(item => (
      <SingleItem
        key={item.itemId}
        uid={uid}
        collectionId={collectionId}
        {...item} />
    ))

  const displayImage = image && (
    <div className='coverart'>
      {image === 'loading' ? ( // TODO: figure out this
        <Icon type='loading' />
      ) : (
        <div>
          <img src={image} alt='cover-art' />
          <label
            className='deleteImage'
            onClick={() => {
              deleteFile(image)
              deleteImage(uid, collectionId)
            }}>
            <Icon type='delete' />
          </label>
        </div>
      )}
    </div>
  )

  const displayTitle = editTitle ? (
    <EditCollectionTitle
      uid={uid}
      collectionId={collectionId}
      title={title}
      toggleEditTitle={toggleEditTitle} />
  ) : (
    <h1 className='titleCollectionView' onClick={toggleEditTitle(true)}>
      {title}
    </h1>
  )

  const uncheckedItems = items
    ? items.filter(item => !item.isComplete).length > 0
    : null
  const checkItems = items
    ? items.filter(item => item.isComplete).length > 0
    : null

  return (
    <div
      style={{ backgroundColor: collectionColor, paddingBottom: '10px' }}
      className='collection-view'>
      {displayImage}
      {displayTitle}

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
      <Footer
        uid={uid}
        collectionColor={collectionColor}
        collectionId={collectionId}
        areItems={!!items}
        uncheckedItems={uncheckedItems}
        checkItems={checkItems}
        collectionView={true}
        image={image} />
    </div>
  )
}

export default SingleCollectionView
