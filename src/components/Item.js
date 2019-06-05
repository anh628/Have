/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

/*
props passed in
itemId,
text,
isComplete
*/
const Item = ({ itemId, text, isComplete }) => (
  <div id='flex' className='item-row'>
    <label className={isComplete ? 'checkbox-completed' : 'checkbox'}>
      <input type='checkbox' checked={isComplete} onChange={toggleTodo} />
    </label>
  </div>
)

export default Item
