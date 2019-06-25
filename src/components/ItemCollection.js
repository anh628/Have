import React from 'react'
import Item from './Item'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import CollectionView from './CollectionView'
import ModalView from './ModalView'
import Footer from './Footer'
import { toggleModalStatus } from '../actions/actionCreator'

class ItemCollection extends React.Component {
  render () {
    const keys = this.props.items
      ? Object.keys(this.props.items).filter(
        key => this.props.items[key] !== null
      )
      : null

    const itemsList = !isLoaded(this.props.items) ? (
      'loading'
    ) : isEmpty(this.props.items) ? (
      <div
        onClick={() => this.props.toggleModalStatus(this.props.collectionId)}>
        Item Collection list is empty
      </div>
    ) : keys ? (
      keys.map(itemId => (
        <Item
          key={itemId}
          uid={this.props.uid}
          collectionId={this.props.collectionId}
          itemId={this.props.itemId}
          collectionColor={this.props.collectionColor}
          {...this.props.items[itemId]} />
      ))
    ) : null

    const displayImage = this.props.image ? (
      <img
        src={this.props.image}
        alt='cover-art'
        onClick={() => this.props.toggleModalStatus(this.props.collectionId)} />
    ) : null

    const uncheckedItems = keys
      ? keys.filter(itemId => this.props.items[itemId].isComplete === false)
        .length > 0
      : null
    const checkItems = keys
      ? keys.filter(itemId => this.props.items[itemId].isComplete === true)
        .length > 0
      : null

    return (
      <div
        style={{
          backgroundColor: this.props.collectionColor
        }}
        id={this.props.open ? 'hide' : null}
        className='item-collection'>
        <div>
          {displayImage}
          <h2
            className='titleCollectionView'
            onClick={() =>
              this.props.toggleModalStatus(this.props.collectionId)
            }>
            {this.props.title}
          </h2>
          <div>{itemsList}</div>
        </div>
        <Footer
          uid={this.props.uid}
          collectionId={this.props.collectionId}
          areItems={!!this.props.items}
          uncheckedItems={uncheckedItems}
          checkItems={checkItems} />
        <ModalView
          collectionId={this.props.collectionId}
          collectionColor={this.props.collectionColor}
          onClose={() => this.props.toggleModalStatus(this.props.collectionId)}
          componentDisplay={
            <CollectionView
              uid={this.props.uid}
              collectionId={this.props.collectionId} />
          } />
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

  const open =
    state.modal.filter(modal => modal.modalId === props.collectionId) &&
    state.modal.filter(modal => modal.modalId === props.collectionId)[0] &&
    state.modal.filter(modal => modal.modalId === props.collectionId)[0].open

  return {
    items,
    open
  }
}

const mapDispatchToProps = {
  toggleModalStatus
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
    mapDispatchToProps
  )
)(ItemCollection)
