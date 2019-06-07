import React from 'react'
import { addCollection } from '../firebase/collectionFunctions'
import { v4 } from 'node-uuid'
import CollectionView from './CollectionView'
import { connect } from 'react-redux'

// TODO: come back to addCollection error!
class NewCollection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collectionView: false,
      collectionId: null,
      title: null
    }
  }

  handleViewChange = (collectionId, title) => {
    this.setState({
      collectionView: true,
      collectionId,
      title
    })
  }

  render () {
    let input
    let collectionColor = '#282c34'
    let collectionId
    let title

    if (this.state.collectionView) {
      return (
        <div>
          <CollectionView
            uid={this.props.uid}
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
              this.props
                .addCollection(
                  this.props.uid,
                  collectionId,
                  title,
                  collectionColor
                )
                .then(() => this.handleViewChange(collectionId, title))
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

const mapDispatchToProps = {
  addCollection
}
export default connect(
  null,
  mapDispatchToProps
)(NewCollection)
