import React from 'react'
import { addItem } from '../firebase/collectionFunctions'

// props passed in: uid, collectionId
class NewItem extends React.Component {
  state = {
    text: ''
  }

  /*
  function for when you leave the add new item bar
  */
  handleBlur = () => {
    if (this.state.text && this.state.text.trim()) {
      addItem(this.props.uid, this.props.collectionId, this.state.text.trim())
    }
  }

  handleChange = event => {
    this.setState({ text: event.currentTarget.value })
  }

  /*
  function that listen to the keys being typed
  determines when to go to handleBlur
  */
  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleBlur()
    }
  }
  render () {
    return (
      <div>
        <input
          className='addItem'
          type='text'
          placeholder='add new item'
          autoFocus={true}
          value={this.state.text}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
      </div>
    )
  }
}

export default NewItem
