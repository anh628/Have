import React from 'react'
import { addCollection } from '../firebase/collectionFunctions'
import { v4 } from 'node-uuid'
import CollectionView from './CollectionView'

class NewCollection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collectionView: false,
      collectionId: null,
      title: null
    }
  }

  handelViewChange = (collectionId, title) => {
    this.setState({
      collectionView: true,
      collectionId,
      title
    })
  }

  render () {
    let input
    let collectionColor = '#282c34;'
    let collectionId
    let title

    if (this.state.collectionView === true) {
      return (
        <div>
          <CollectionView
            collectionId={this.state.collectionId}
            title={this.state.title} />
        </div>
      )
    } else {
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
              ).then(() => this.handelViewChange(collectionId, title))
            }}>
            <input
              className='addItem'
              type='text'
              ref={node => (input = node)}
              autoFocus={true}
              placeholder='add a collection title' />
          </form>
        </div>
      )
    }
  }
}

export default NewCollection
