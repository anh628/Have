/* eslint-disable no-console */
import React from 'react'
import Item from './Item'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

/*
Props passing in from List
collaborators: [],
collectionColor: "",
image: boolean,
title: "",
collectionId
*/
const ItemCollection = ({
  uid,
  collectionId,
  collectionColor,
  title,
  items
}) => {
  const keys = items ? Object.keys(items) : null

  const itemsList = !isLoaded(items) ? (
    <p className='item collection'>loading</p>
  ) : isEmpty(items) ? (
    'Item Collection list is empty'
  ) : keys ? (
    keys.map(itemId => (
      <Item
        key={itemId}
        uid={uid}
        collectionId={collectionId}
        itemId={itemId}
        {...items[itemId]} />
    ))
  ) : null
  return (
    <div
      style={{ backgroundColor: collectionColor }}
      className='item-collection'>
      <h2 className='item-collection-title'>{title}</h2>
      {itemsList}
    </div>
  )
}

function mapStateToProps (state, props) {
  const items =
    state.firestore.data.users &&
    state.firestore.data.users[props.uid] &&
    state.firestore.data.users[props.uid].itemCollections &&
    state.firestore.data.users[props.uid].itemCollections[props.collectionId] &&
    state.firestore.data.users[props.uid].itemCollections[props.collectionId]
      .items
  return { items }
}
export default compose(
  firestoreConnect(props => [
    `users/${props.uid}/itemCollections/${props.collectionId}/items/`
  ]),
  connect(
    mapStateToProps,
    null
  )
)(ItemCollection)
