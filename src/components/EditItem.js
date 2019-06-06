import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  editItem,
  deleteItem,
  toggleItem
} from '../firebase/collectionFunctions'

class EditItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false
    }
  }
  handelendEdit = () => {
    this.setState({
      isEditing: false
    })
  }

  handelBeginEdit = () => {
    this.setState({
      isEditing: true
    })
  }

  handleChange = event => {
    // editItem = (uid, collectionId, itemId, editedText)
    editItem(
      this.props.users[0].id,
      this.props.collectionId,
      this.props.itemId,
      event.currentTarget.value
    )
  }

  handelDelete = () => {
    deleteItem(
      this.props.users[0].id,
      this.props.collectionId,
      this.props.itemId
    )
  }

  handelToggle = () => {
    toggleItem(
      this.props.users[0].id,
      this.props.collectionId,
      this.props.itemId
    )
  }

  render () {
    let EditableItem = (
      <div>
        <input
          onBlur={this.handelendEdit}
          type='text'
          name='todo'
          onChange={this.handleChange}
          value={this.props.text}
          autoFocus />{' '}
      </div>
    )
    let itemDisplay = (
      <div className='ItemCollectionView'>
        <button className='buttonStyling' onClick={this.handelToggle}>
          {' '}
          X{' '}
        </button>
        <span onClick={this.handelBeginEdit}> {this.props.text} </span>
        <button className='deleteButton' onClick={this.handelDelete}>
          {' '}
          delete{' '}
        </button>
      </div>
    )

    if (this.state.isEditing === true) {
      return EditableItem
    } else {
      return itemDisplay
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
)(EditItem)
