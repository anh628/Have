/* eslint-disable standard/computed-property-even-spacing */
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import EditItem from './EditItem'
import NewItem from './NewItem'

// TODO: edit collection title here
// props passed are uid, collectionID, title
class CollectionView extends React.Component {
  render () {
    if (this.props.items) {
      const itemKeys = Object.keys(this.props.items)
      return (
        <div>
          <h1 className='titleCollectionViewBlur'>HAVE</h1>
          <h1 className='titleCollectionView'>{this.props.title}</h1>

          {itemKeys.map(itemId => (
            <EditItem
              key={itemId}
              collectionId={this.props.collectionId}
              itemId={itemId}
              {...this.props.items[itemId]}
              uid={this.props.uid} />
          ))}
          <NewItem
            collectionId={this.props.collectionId}
            uid={this.props.uid} />
        </div>
      )
    } else {
      return (
        <div>
          <h1 className='titleCollectionViewBlur'>HAVE</h1>
          <h1 className='titleCollectionView'>{this.props.title}</h1>
          <NewItem collectionId={this.props.collectionId} />
        </div>
      )
    }
  }
}

function mapStateToProps (state, props) {
  const items =
    state.firestore.data.users &&
    state.firestore.data.users[this.props.uid] &&
    state.firestore.data.users[this.props.uid].itemCollections &&
    state.firestore.data.users[this.props.uid].itemCollections[
      props.collectionId
    ] &&
    state.firestore.data.users[this.props.uid].itemCollections[
      props.collectionId
    ].items
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
)(CollectionView)
