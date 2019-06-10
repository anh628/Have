/* eslint-disable standard/computed-property-even-spacing */
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import EditItem from './EditItem'
import NewItem from './NewItem'
import Footer from './Footer'

// TODO: edit collection title here
const CollectionView = ({
  uid,
  collectionId,
  title,
  items,
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
  return (
    <div style={{ backgroundColor: collectionColor }}>
      <h1 className='titleCollectionViewBlur'>HAVE</h1>
      <h1 className='titleCollectionView'>{title}</h1>
      {editItem}
      <NewItem collectionId={collectionId} uid={uid} />
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
  return {
    items,
    collectionColor
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
