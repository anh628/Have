import React from 'react'
import { editTitle } from '../firebase/collectionFunctions'

class EditCollectionTitle extends React.Component {
  state = {
    title: this.props.title, // the edited title
    original: this.props.title // the original title
  }

  /*
  function for when you leave the title box
  */
  handleBlur = cancel => {
    // if cancel is true then return title back to the original title
    if (cancel === true) {
      this.setState({ title: this.state.original })
    } else {
      editTitle(this.props.uid, this.props.collectionId, this.state.title)
    }
    // toggle off the edit mode
    this.props.toggleEditTitleMode()
  }

  /*
  function to handle change in title box
  */
  handleChange = event => {
    this.setState({ title: event.currentTarget.value })
  }

  /*
  function that listen to the keys being typed
  determines when to go to handleBlur
  */
  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.handleBlur(true)
    }
    if (event.key === 'Enter') {
      this.handleBlur(false)
    }
  }

  render () {
    return (
      <h1 className=' titleCollectionView-editing'>
        <input
          type='input'
          value={this.state.title}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          autoFocus={true} />
      </h1>
    )
  }
}

export default EditCollectionTitle
