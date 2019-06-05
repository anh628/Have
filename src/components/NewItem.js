import React from 'react'
import { addItem } from '../firebase/collectionFunctions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

class NewItem extends React.Component {
  render () {
    let input
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              input.value = ' '
            }
            addItem(
              this.props.users[0].id,
              this.props.collectionId,
              input.value
            )
            input.value = ''
          }}>
          <input type='text' ref={node => (input = node)} autoFocus={true} />
        </form>
      </div>
    )
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
      doc: 'rKvQ9nM6WXrEZ2xOCgwN', // props.user.uid
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
)(NewItem)
