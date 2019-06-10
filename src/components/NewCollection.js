import React from 'react'
import { addCollection } from '../firebase/collectionFunctions'
import { v4 } from 'node-uuid'
import CollectionView from './CollectionView'
import Modal from 'react-responsive-modal'
import { COLLECTION_COLOR } from '../constants/constants'
import ModalView from './ModalView'

class NewCollection extends React.Component {
  state = {
    collectionView: false,
    collectionId: null,
    title: null,
    open: false
  }

  openModal (collectionId, title) {
    this.setState({
      open: true,
      collectionView: true,
      collectionId,
      title
    })
  }

  closeModal () {
    this.setState({
      open: false
    })
  }

  render () {
    let input
    let collectionId
    let title

    return (
      <div>
        <h1 className='titleCollectionView'>HAVE</h1>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              input.value = ' '
            }
            title = input.value
            collectionId = v4()
            addCollection(
              this.props.uid,
              collectionId,
              title,
              COLLECTION_COLOR
            ).then(() => this.openModal(collectionId, title))
            input.value = ''
          }}>
          <input
            className='addItem'
            type='text'
            ref={node => (input = node)}
            autoFocus={true}
            placeholder='add a collection title' />
        </form>
        {/* <Modal
          open={this.state.open}
          styles={{
            modal: {
              backgroundColor: COLLECTION_COLOR
            }
          }}
          onClose={() => this.closeModal()}>
          <CollectionView
            uid={this.props.uid}
            collectionId={this.state.collectionId}
            title={this.state.title} />
        </Modal> */}
        <ModalView
          uid={this.props.uid}
          collectionId={this.state.collectionId}
          title={this.state.title}
          open={this.state.open}
          collectionColor={this.props.collectionColor} />
      </div>
    )
  }
}

export default NewCollection
