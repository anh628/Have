import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  addItem,
  editTitle,
  editItem,
  deleteItem,
  toggleItem
} from '../firebase/collectionFunctions'

class EditItem extends React.Component {
  render () {
    return (
      <div>
        <p>{this.props.text}</p>
      </div>
    )
  }
}

export default EditItem
