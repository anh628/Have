import React from 'react'
import { addCollection } from '../firebase/collectionFunctions'
import { v4 } from 'node-uuid'
import CollectionView from './CollectionView'
import { COLLECTION_COLOR } from '../constants/constants'
import ModalView from './ModalView'
import { toggleModalStatus } from '../actions/actionCreator'
import { connect } from 'react-redux'

// uid is passed in as a prop
class NewCollection extends React.Component {
  state = {
    collectionId: null
  }

  setCollectionId (collectionId) {
    this.setState({
      collectionId
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
            this.props
              .addCollection(
                this.props.uid,
                collectionId,
                title,
                COLLECTION_COLOR
              )
              .then(() => {
                this.setCollectionId(collectionId)
              })
            input.value = ''
          }}>
          <input
            className='addItem'
            type='text'
            ref={node => (input = node)}
            autoFocus={true}
            placeholder='add a collection title' />
        </form>

        <ModalView
          collectionColor={COLLECTION_COLOR}
          collectionId={this.state.collectionId}
          componentDisplay={
            <CollectionView
              uid={this.props.uid}
              collectionId={this.state.collectionId} />
          } />
      </div>
    )
  }
}

const mapDispatchToProps = {
  toggleModalStatus,
  addCollection
}

export default connect(
  null,
  mapDispatchToProps
)(NewCollection)
