/* eslint-disable no-console */
import React from 'react'
import Item from './Item'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { changeEditCollectionFlag } from '../actions/actionCreators'
import CollectionView from './CollectionView'
import Footer from './Footer'

const ItemCollection = ({
  uid,
  collectionId,
  collectionColor,
  title,
  items,
  editCollectionFlag,
  changeEditCollectionFlag,
  image
}) => {
  if (editCollectionFlag) {
    return <CollectionView collectionId={collectionId} />
  } else {
    const keys = items ? Object.keys(items) : null

    const itemsList = !isLoaded(items)
      ? 'loading'
      : isEmpty(items)
        ? 'Item Collection list is empty'
        : keys
          ? keys.map(itemId => (
            <Item
              key={itemId}
              uid={uid}
              collectionId={collectionId}
              itemId={itemId}
              {...items[itemId]} />
          ))
          : null

    const displayImage = image ? <img src={image} alt='cover-art' /> : null

    return (
      <div
        style={{ backgroundColor: collectionColor }}
        className='item-collection'>
        <div onClick={() => changeEditCollectionFlag(collectionId)}>
          {displayImage}
          <h2 className='item-collection-title'>{title}</h2>
          <div>{itemsList}</div>
        </div>
        <Footer uid={uid} collectionId={collectionId} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const items =
    state.firestore.data.users &&
    state.firestore.data.users[props.uid] &&
    state.firestore.data.users[props.uid].itemCollections &&
    state.firestore.data.users[props.uid].itemCollections[props.collectionId] &&
    state.firestore.data.users[props.uid].itemCollections[props.collectionId]
      .items

  const editCollectionFlag =
    state.collection.filter(list => list.collectionId === props.collectionId)
      .length > 0 &&
    state.collection.filter(list => list.collectionId === props.collectionId)[0]
      .editCollectionFlag

  return {
    items,
    editCollectionFlag
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
)(ItemCollection)
