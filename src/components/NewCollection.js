import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import { addCollection, editTitle } from '../firebase/collectionFunctions'
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
      collectionId: collectionId,
      title: title
    })
  }

  render () {
    let input
    let collectionColor = '#FFFFFF'
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
                this.props.users[0].id,
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
              defaultValue='add a collection title' />
          </form>
        </div>
      )
    }
  }
}

function mapStateToProps (state) {
  return {
    users: state.firestore.ordered.users
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: 'JofY9DCsywfgVtSOBxd2BZ7OBDn1', // props.user.uid
      subcollections: [
        {
          collection: 'itemCollections',
          doc: 'lCHu8ouJOVXyBijkdnZO', // props.collectionId
          subcollections: [
            {
              collection: 'items'
            }
          ]
        }
      ]
    }
  ]) // going to get todos for a user
)(NewCollection)
