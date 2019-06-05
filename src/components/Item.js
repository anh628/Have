/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { toggleItem, deleteItem } from '../firebase/collectionFunctions'
import Emoji from './Emoji'

/*
props passed in
uid,
collectionId
itemId,
text,
isComplete
*/
class Item extends React.Component {
  display = (
    <div id='flex' className='item-row'>
      <label
        className={this.props.isComplete ? 'checkbox-completed' : 'checkbox'}>
        <input
          type='checkbox'
          checked={this.props.isComplete}
          onChange={() =>
            toggleItem(
              this.props.uid,
              this.props.collectionId,
              this.props.itemId
            )
          } />
      </label>
      <label
        style={{
          textDecoration: this.props.isComplete ? 'line-through' : 'none'
        }}>
        {this.props.text}
      </label>
      <button
        className='destroy'
        onClick={() =>
          deleteItem(this.props.uid, this.props.collectionId, this.props.itemId)
        }>
        <Emoji symbol='🗑' label='trashCan' />
      </button>
    </div>
  )

  render () {
    return <div>{this.display}</div>
  }
}
export default Item
