import React from 'react'
import {
  editItem,
  deleteItem,
  toggleItem
} from '../firebase/collectionFunctions'

// props passed in: uid, collectionId, itemId, and all items associated props
class EditItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false
    }
  }

  // TODO: something somewhere to also handle what happen when we hit enter
  handleEndEdit = () => {
    this.setState({
      isEditing: false
    })
  }

  handleBeginEdit = () => {
    this.setState({
      isEditing: true
    })
  }

  handleChange = event => {
    // editItem = (uid, collectionId, itemId, editedText)
    editItem(
      this.props.uid,
      this.props.collectionId,
      this.props.itemId,
      event.currentTarget.value
    )
  }

  handleDelete = () => {
    deleteItem(this.props.uid, this.props.collectionId, this.props.itemId)
  }

  handleToggle = () => {
    toggleItem(this.props.uid, this.props.collectionId, this.props.itemId)
  }

  render () {
    let editableItem = (
      <div>
        <input
          className='addItem'
          onBlur={this.handleEndEdit}
          type='text'
          onChange={this.handleChange}
          value={this.props.text}
          autoFocus />{' '}
      </div>
    )
    let itemDisplay = (
      <div className='ItemCollectionView'>
        <input
          type='checkbox'
          checked={this.props.isComplete}
          onChange={this.handleToggle} />
        <span onClick={this.handleBeginEdit}> {this.props.text} </span>
        {/* TODO: for way later, trash can? */}
        <button className='deleteButton' onClick={this.handleDelete}>
          {' '}
          delete{' '}
        </button>
        {/* still have to fix the delete button here so the buttons go away when needed  */}
      </div>
    )

    if (this.state.isEditing === true) {
      return editableItem
    } else {
      return itemDisplay
    }
  }
}

export default EditItem
