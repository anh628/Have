import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import { deleteImage } from '../firebase/collectionFunctions'
import { deleteFile } from '../firebase/storageFunctions'
import EditCollectionTitle from './EditCollectionTitle'
import EditItem from './EditItem'
import NewItem from './NewItem'
import Footer from './Footer'
import Emoji from './Emoji'

class CollectionView extends React.Component {
  state = {
    editTitleMode: false
  }

  toggleEditTitleMode = () => {
    this.setState({ editTitleMode: !this.state.editTitleMode })
  }

  render () {
    const itemKeys = this.props.items
      ? Object.keys(this.props.items).filter(
        key => this.props.items[key] !== null
      )
      : null

    // list of all items in the collection
    const editItem = this.props.items
      ? itemKeys.map(itemId => (
        <EditItem
          key={itemId}
          collectionId={this.props.collectionId}
          itemId={itemId}
          {...this.props.items[itemId]}
          uid={this.props.uid} />
      ))
      : null

    const displayImage = this.props.image ? (
      <div className='coverart'>
        <img src={this.props.image} alt='cover-art' />
        <label
          className='deleteImage'
          onClick={() => {
            deleteFile(this.props.image)
            deleteImage(this.props.uid, this.props.collectionId)
          }}>
          <Emoji symbol='🗑' label='delete' />
        </label>
      </div>
    ) : null

    const displayTitle = this.state.editTitleMode ? (
      <EditCollectionTitle
        toggleEditTitleMode={this.toggleEditTitleMode}
        title={this.props.title}
        uid={this.props.uid}
        collectionId={this.props.collectionId} />
    ) : (
      <h1
        className='titleCollectionView'
        onClick={() => this.toggleEditTitleMode()}>
        {this.props.title}
      </h1>
    )

    const uncheckedItems = itemKeys
      ? itemKeys.filter(itemId => this.props.items[itemId].isComplete === false)
        .length > 0
      : null
    const checkItems = itemKeys
      ? itemKeys.filter(itemId => this.props.items[itemId].isComplete === true)
        .length > 0
      : null

    return (
      <div style={{ backgroundColor: this.props.collectionColor }}>
        {displayImage}
        {displayTitle}
        {editItem}
        <NewItem collectionId={this.props.collectionId} uid={this.props.uid} />
        <Footer
          uid={this.props.uid}
          collectionId={this.props.collectionId}
          areItems={!!this.props.items}
          uncheckedItems={uncheckedItems}
          checkItems={checkItems}
          collectionView={true} />
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

  const collectionColor =
    state.firestore.data.itemCollections &&
    state.firestore.data.itemCollections[props.collectionId] &&
    state.firestore.data.itemCollections[props.collectionId].collectionColor

  const image =
    state.firestore.data.itemCollections &&
    state.firestore.data.itemCollections[props.collectionId] &&
    state.firestore.data.itemCollections[props.collectionId].image

  const title =
    state.firestore.data.itemCollections &&
    state.firestore.data.itemCollections[props.collectionId] &&
    state.firestore.data.itemCollections[props.collectionId].title

  return {
    items,
    collectionColor,
    image,
    title
  }
}

export default compose(
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid,
      subcollections: [
        {
          collection: 'itemCollections',
          doc: props.collectionId,
          subcollections: [{ collection: 'items', orderBy: 'timeStamp' }]
        }
      ]
    }
  ]),
  connect(
    mapStateToProps,
    null
  )
)(CollectionView)
