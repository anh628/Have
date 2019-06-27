import React from 'react'
import {
  editItem,
  deleteItem,
  toggleItem
} from '../firebase/collectionFunctions'
import { Icon } from 'antd'
// props passed in: uid, collectionId, itemId, and all items associated props
class EditItem extends React.Component {
  state = {
    text: this.props.text,
    isEditing: false
  }

  handleEndEdit = () => {
    // if text exists, update the item's text
    if (this.state.text !== null && this.state.text.trim()) {
      editItem(
        this.props.uid,
        this.props.collectionId,
        this.props.itemId,
        this.state.text.trim()
      )
    } else {
      // deletes item if text is null
      this.handleDelete()
    }

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
    this.setState({ text: event.currentTarget.value })
  }

  handleDelete = () => {
    deleteItem(this.props.uid, this.props.collectionId, this.props.itemId)
  }

  // handles checking off item
  handleToggle = () => {
    toggleItem(this.props.uid, this.props.collectionId, this.props.itemId)
  }

  /*
  function that listen to the keys being typed
  determines when to go to handleBlur
  */
  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleEndEdit()
    }
  }

  render () {
    let editableItem = (
      <input
        className='addItem'
        onBlur={this.handleEndEdit}
        type='text'
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.state.text}
        autoFocus />
    )
    let itemDisplay = (
      <div className='ItemCollectionView'>
        {this.props.isComplete ? (
          <Icon
            type='check-square'
            onClick={this.handleToggle}
            style={{ paddingRight: '5px' }} />
        ) : (
          <Icon
            type='border'
            onClick={this.handleToggle}
            style={{ paddingRight: '5px' }} />
        )}
        <label
          onClick={this.handleBeginEdit}
          style={{
            textDecoration: this.props.isComplete ? 'line-through' : 'none'
          }}>
          {this.props.text}
        </label>
        <button className='deleteButton' onClick={this.handleDelete}>
          delete
        </button>
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
