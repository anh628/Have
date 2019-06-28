import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import ItemCollection from './ItemCollection'
import { message } from 'antd'

const List = ({ itemCollections, uid, anon }) => {
  const info = () => {
    message.info('Log in to save your list', 5)
  }

  message.config({
    top: 30,
    duration: 2,
    maxCount: 3
  })
  // build list if itemCollections exist and are loaded.
  const itemCollectionList = !isLoaded(itemCollections)
    ? 'loading'
    : isEmpty(itemCollections) && anon
      ? info()
      : itemCollections.map(item => (
        <ItemCollection
          key={item.id}
          collectionId={item.id}
          {...item}
          uid={uid} />
      ))
  return <div>{itemCollectionList}</div>
}

function mapStateToProps (state) {
  const itemCollections = state.firestore.ordered.itemCollections

  return {
    itemCollections
  }
}
export default compose(
  firestoreConnect(props => [
    {
      storeAs: 'itemCollections',
      collection: `users/${props.uid}/itemCollections/`,
      orderBy: 'timeStamp'
    }
  ]),
  connect(
    mapStateToProps,
    null
  )
)(List)
