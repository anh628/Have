import React from 'react'
import { addCollection } from '../firebase/collectionFunctions'
import { v4 } from 'node-uuid'
import CollectionView from './CollectionView'
import Modal from 'react-responsive-modal'

class NewCollection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collectionView: false,
      collectionId: null,
      title: null,
      open: false
    }
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
    let collectionColor = '#8a8c90'
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
              collectionColor
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
        <Modal
          open={this.state.open}
          styles={{
            modal: {
              backgroundColor: collectionColor
            }
          }}
          width='400'
          height='300'
          effect='fadeInUp'
          onClose={() => this.closeModal()}>
          <CollectionView
            uid={this.props.uid}
            collectionId={this.state.collectionId}
            title={this.state.title} />
        </Modal>
      </div>
    )
  }
}

export default NewCollection
