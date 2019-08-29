import React from 'react'
import { Icon, Card } from 'antd'
import { deleteImage } from '../firebase/collectionFunctions'
import { deleteFile } from '../firebase/storageFunctions'
import SingleCollectionTitleView from './SingleCollectionTitleView'
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
      {image === 'loading' ? (
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

  const uncheckedItems =
    items && items.filter(item => !item.isComplete).length > 0

  const checkItems = items && items.filter(item => item.isComplete).length > 0

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
          modalView={true} />
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
