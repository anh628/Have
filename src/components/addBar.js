import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import {
  addItem,
  addCollection,
  editTitle
} from '../firebase/collectionFunctions'

// addCollection = (uid, collectionId, collectionColor)
// addItem = (uid, collectionId, itemId, text)
// editTitle(uid, collectionId, title)

class AddBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showingExpandedBar: false
    }
  }

  handelClick = () => {
    this.setState({
      showingExpandedBar: true
    })
  }
  handleClose = () => {
    this.setState({ showingExpandedBar: false })
  }

  handelTitleChange (event) {
    editTitle(event.target.value)
  }

  render () {
    let input

    if (this.state.showingExpandedBar === true) {
      return (
        <form
          onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              input.value = ' '
            }
            // addCollection = (uid,  collectionColor)
            // addItem = (uid, collectionId, text)
          }}
          onBlur={this.handleClose}>
          <input ref={node => (input = node)} />
        </form>
      )
    } else {
      return <div onClick={this.handelClick}> click here</div>
    }
  }
}

function mapStateToProps (state) {
  return {
    users: state.firestore.ordered.users // have a user
    // itemCollections: state.firestore.ordered.users.itemCollections /// LEFT OFF HERE NEED TO FIGURE THIS OUT
    //   ? state.firestore.ordered.itemCollections.filter(
    //     item => item.id === 'rKvQ9nM6WXrEZ2xOCgwN'
    //   )
    //   : []
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
)(AddBar)
