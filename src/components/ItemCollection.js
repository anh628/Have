import React from 'react'
import Item from './Item'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { changeEditCollectionFlag } from '../actions/actionCreators'
import CollectionView from './CollectionView'
import Footer from './Footer'
import Modal from 'react-responsive-modal'

class ItemCollection extends React.Component {
  state = {
    open: false
  }

  openModal () {
    this.setState({
      open: true
    })
  }

  closeModal () {
    this.setState({
      open: false
    })
  }

  render () {
    const keys = this.props.items ? Object.keys(this.props.items) : null

    const itemsList = !isLoaded(this.props.items)
      ? 'loading'
      : isEmpty(this.props.items)
        ? 'Item Collection list is empty'
        : keys
          ? keys.map(itemId => (
            <Item
              key={itemId}
              uid={this.props.uid}
              collectionId={this.props.collectionId}
              itemId={this.props.itemId}
              {...this.props.items[itemId]} />
          ))
          : null

    const uncheckedItems = keys
      ? keys.filter(itemId => this.props.items[itemId].isComplete === false)
        .length > 0
      : null
    const checkItems = keys
      ? keys.filter(itemId => this.props.items[itemId].isComplete === true)
        .length > 0
      : null
    const displayImage = this.props.image ? (
      <img src={this.props.image} alt='cover-art' />
    ) : null

    const modal = (
      <Modal
        closeOnEsc={true}
        open={this.state.open}
        styles={{
          modal: {
            backgroundColor: this.props.collectionColor
          }
        }}
        width='400'
        height='300'
        effect='fadeInUp'
        onClose={() => this.closeModal()}>
        <CollectionView
          uid={this.props.uid}
          collectionId={this.props.collectionId}
          title={this.props.title} />
      </Modal>
    )

    return (
      <div
        style={{ backgroundColor: this.props.collectionColor }}
        className='item-collection'>
        <div onClick={() => this.openModal()}>
          {displayImage}
          <h2 className='item-collection-title'>{this.props.title}</h2>
          <div>{itemsList}</div>
        </div>
        <Footer
          uid={this.props.uid}
          collectionId={this.props.collectionId}
          areItems={!!this.props.items}
          uncheckedItems={uncheckedItems}
          checkItems={checkItems} />
        {modal}
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
  return {
    items
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
)(ItemCollection)
