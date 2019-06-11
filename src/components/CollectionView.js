/* eslint-disable standard/computed-property-even-spacing */
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import EditItem from './EditItem'
import NewItem from './NewItem'
import Footer from './Footer'
<<<<<<< HEAD
||||||| merged common ancestors
import { changeEditCollectionFlag } from '../actions/actionCreators'
=======
import Emoji from './Emoji'
import { deleteImage } from '../firebase/collectionFunctions'
import { deleteFile } from '../firebase/storageFunctions'
>>>>>>> dev1

// TODO: edit collection title here
const CollectionView = ({
  uid,
  collectionId,
  title,
  items,
  image,
  collectionColor
}) => {
  const itemKeys = items ? Object.keys(items) : null

  const editItem = items
    ? itemKeys.map(itemId => (
      <EditItem
        key={itemId}
        collectionId={collectionId}
        itemId={itemId}
        {...items[itemId]}
        uid={uid} />
    ))
    : null

  const displayImage = image ? (
    <div className='coverart'>
      <img src={image} alt='cover-art' />
      <label
        className='deleteImage'
        onClick={() => {
          deleteFile(image)
          deleteImage(uid, collectionId)
        }}>
        <Emoji symbol='🗑' label='delete' />
      </label>
    </div>
  ) : null

  const uncheckedItems = itemKeys
    ? itemKeys.filter(itemId => items[itemId].isComplete === false).length > 0
    : null
  const checkItems = itemKeys
    ? itemKeys.filter(itemId => items[itemId].isComplete === true).length > 0
    : null

  return (
    <div style={{ backgroundColor: collectionColor }}>
      {displayImage}
      <h1 className='titleCollectionView'>{title}</h1>
      {editItem}
      <NewItem collectionId={collectionId} uid={uid} />
<<<<<<< HEAD
      {items ? <Footer uid={uid} collectionId={collectionId} /> : null}
||||||| merged common ancestors
      {/* TODO: DOUBLE CHECK THIS */}
      {/* <label onClick={() => changeEditCollectionFlag(collectionId)}>Done</label> */}
      {items ? <Footer uid={uid} collectionId={collectionId} /> : null}
=======
      <Footer
        uid={uid}
        collectionId={collectionId}
        areItems={!!items}
        uncheckedItems={uncheckedItems}
        checkItems={checkItems}
        collectionView={true} />
>>>>>>> dev1
    </div>
  )
}
const mapStateToProps = (state, props) => {
  const items =
    state.firestore.data.users &&
    state.firestore.data.users[props.uid] &&
    state.firestore.data.users[props.uid].itemCollections &&
    state.firestore.data.users[props.uid].itemCollections[props.collectionId] &&
    state.firestore.data.users[props.uid].itemCollections[props.collectionId]
      .items

  const collectionColor =
    state.firestore.data.itemCollections &&
    state.firestore.data.itemCollections[props.collectionId] &&
    state.firestore.data.itemCollections[props.collectionId].collectionColor

  const image =
    state.firestore.data.itemCollections &&
    state.firestore.data.itemCollections[props.collectionId] &&
    state.firestore.data.itemCollections[props.collectionId].image

  return {
    items,
    collectionColor,
    image
  }
}

export default compose(
  firestoreConnect(props => [
    `users/${props.uid}/itemCollections/${props.collectionId}/items/`
  ]),
  connect(
    mapStateToProps,
    null
  )
)(CollectionView)
