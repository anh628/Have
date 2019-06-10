/* eslint-disable standard/computed-property-even-spacing */
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import EditItem from './EditItem'
import NewItem from './NewItem'
import Footer from './Footer'
import Emoji from './Emoji'
import { changeEditCollectionFlag } from '../actions/actionCreators'
import { deleteImage } from '../firebase/collectionFunctions'
import { deleteFile } from '../firebase/storageFunctions'

// TODO: edit collection title here
const CollectionView = ({
  uid,
  collectionId,
  title,
  items,
  image,
  collectionColor,
  changeEditCollectionFlag
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

  // TODO: THIS IS NOT WORKING PROPERLY
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

  return (
    <div style={{ backgroundColor: collectionColor }}>
      {/* <h1 className='titleCollectionViewBlur'>HAVE</h1> */}
      {displayImage}
      <h1 className='titleCollectionView'>{title}</h1>
      {editItem}
      <NewItem collectionId={collectionId} uid={uid} />
      {/* TODO: DOUBLE CHECK THIS */}
      {/* <label onClick={() => changeEditCollectionFlag(collectionId)}>Done</label> */}
      {items ? <Footer uid={uid} collectionId={collectionId} /> : null}
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

const mapDispatchToProps = {
  changeEditCollectionFlag
}
export default compose(
  firestoreConnect(props => [
    `users/${props.uid}/itemCollections/${props.collectionId}/items/`
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CollectionView)
