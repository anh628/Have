import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'uuid'
import { toggleModalStatus } from '../actions/actionCreator'
import { addCollection } from '../firebase/collectionFunctions'
import PropTypes from 'prop-types'

const NewCollection = ({ uid }) => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [collectionId, setCollectionId] = useState(uuid.v4())
  return (
    <header className='App-header'>
      <div>
        <h1 className='title'>HAVE</h1>
        <label className='descrip'>a collection of lists</label>

        <input
          className='addCollection'
          type='text'
          ref={inputRef}
          placeholder='name your list'
          onKeyDown={async e => {
            // if you hit the escape key, reset the text box
            if (e.key === 'Escape') {
              inputRef.current.value = ''
            }
            // if you hit the enter key, create a new collection, reset the text box and open up the modal
            if (e.key === 'Enter') {
              const text = inputRef.current.value.trim()
              if (text) {
                setCollectionId(uuid.v4())
                await addCollection(uid, collectionId, text)
                dispatch(toggleModalStatus(collectionId))
              }
              inputRef.current.value = ''
            }
          }}
          autoFocus />
      </div>
    </header>
  )
}

NewCollection.propTypes = {
  uid: PropTypes.string.isRequired
}

export default NewCollection
