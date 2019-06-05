import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import {
  addItem,
  addCollection,
  editTitle
} from '../firebase/collectionFunctions'
import { v4 } from 'node-uuid'
import EditItem from './EditItem'
import NewItem from './NewItem'

class CollectionView extends React.Component {
  render () {
    if (this.props.items) {
      // if there is a prop items
      const itemKeys = Object.keys(this.props.items)
      return (
        // map through and get these edit items out
        <div>
          <h1>{this.props.title}</h1>

          {itemKeys.map(itemId => (
            <EditItem
              key={itemId}
              collectionId={this.props.collectionId}
              itemId={itemId}
              {...this.props.items[itemId]} />
          ))}
          <NewItem collectionId={this.props.collectionId} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.title}</h1>
          <NewItem collectionId={this.props.collectionId} />
        </div>
      )
    }
  }
}

function mapStateToProps (state, props) {
  const items =
    state.firestore.data.users &&
    state.firestore.data.users['JofY9DCsywfgVtSOBxd2BZ7OBDn1'] &&
    state.firestore.data.users['JofY9DCsywfgVtSOBxd2BZ7OBDn1']
      .itemCollections &&
    state.firestore.data.users['JofY9DCsywfgVtSOBxd2BZ7OBDn1'].itemCollections[
      props.collectionId
    ] &&
    state.firestore.data.users['JofY9DCsywfgVtSOBxd2BZ7OBDn1'].itemCollections[
      props.collectionId
    ].items
  console.log(items)
  return { items }
}
export default compose(
  firestoreConnect(props => [
    `users/JofY9DCsywfgVtSOBxd2BZ7OBDn1/itemCollections/${
      props.collectionId
    }/items/`
  ]),
  connect(
    mapStateToProps,
    null
  )
)(CollectionView)
