<<<<<<< HEAD
import React from 'react'
=======
import React, { useState } from 'react'
>>>>>>> master1
import { useDispatch } from 'react-redux'
import { uploadFile, deleteFile } from '../firebase/storageFunctions'
import {
  editImage,
  deleteCollection,
  deleteAllCompleted,
  setAllItemsCompleteness
} from '../firebase/collectionFunctions'
import { toggleModalStatus } from '../actions/actionCreator'
<<<<<<< HEAD
import useToggle from '../hooks/useToggle'
=======
>>>>>>> master1
import { Icon, Tooltip } from 'antd'
import Color from './Color'
import NewCatButton from './NewCatButton'

const Footer = ({
  collectionColor,
  areItems,
  checkItems,
  collectionId,
  image,
  uid,
  uncheckedItems,
<<<<<<< HEAD
  modalView = false,
  itemIds
}) => {
  const [showMenu, toggle] = useToggle(false)
=======
  modalView = false
}) => {
  const [showMenu, toggleMenu] = useState(false)
>>>>>>> master1
  const dispatch = useDispatch()

  const collectionImageInputId = modalView
    ? `${collectionId}-imageMV`
    : `${collectionId}-image`

  const imageButton = (
    <div className='footer-button'>
      <Tooltip title={`${image ? 'Change' : 'Add'} cover art.`} placement='top'>
        <label>
          <input
            type='file'
            onChange={async () => {
              if (image) await deleteFile(image)
              editImage(uid, collectionId, 'loading')
              const url = await uploadFile(
                collectionImageInputId,
                uid,
                collectionId
              )
              editImage(uid, collectionId, url)
            }}
            id={collectionImageInputId}
            name='files'
            accept='image/*'
            style={{ display: 'none' }} />
<<<<<<< HEAD
          <Icon type='picture' onClick={toggle} />
=======
          <Icon type='picture' />
>>>>>>> master1
        </label>
      </Tooltip>
    </div>
  )

  /*
  Delete Note,
  Check all items
  Uncheck all items
  Delete checked items
  */
  const moreButton = (
<<<<<<< HEAD
    <div className='footer-button' onClick={toggle}>
=======
    <div className='footer-button' onClick={() => toggleMenu(!showMenu)}>
>>>>>>> master1
      <Tooltip title='More' placement='top'>
        <Icon type='menu' className='dropdown' id='more' />
        <div
          className={`dropdown-content-more  ${showMenu ? 'show' : ''}`}
          id={`more-dropdown ${collectionId}`}
<<<<<<< HEAD
          onClick={toggle}>
=======
          onClick={() => toggleMenu(false)}>
>>>>>>> master1
          <label onClick={() => deleteCollection(uid, collectionId)}>
            Delete list
          </label>
          {/* Only display the rest of the options if there are items in the collection */}
          {areItems && (
            <div>
              {/* Only display if there are uncheck items */}
              {uncheckedItems && (
                <label
                  onClick={() =>
                    setAllItemsCompleteness(uid, collectionId, true)
                  }>
                  Check all items
                </label>
              )}

              {/* display if there are checked items */}
              {checkItems && (
                <div>
                  <label
                    onClick={() =>
                      setAllItemsCompleteness(uid, collectionId, false)
                    }>
                    Uncheck all items
                  </label>
                  <label onClick={() => deleteAllCompleted(uid, collectionId)}>
                    Delete checked items
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  )

  const changeColorButton = (
<<<<<<< HEAD
    <div className='footer-button' onClick={toggle}>
=======
    <div className='footer-button'>
>>>>>>> master1
      <Color uid={uid} collectionId={collectionId} />
    </div>
  )

  const doneButton = (
    <div className='footer-button'>
      <label onClick={() => dispatch(toggleModalStatus(collectionId))}>
        Done
      </label>
    </div>
  )

  return (
    <div
      className='footer-bar'
      id={modalView ? 'cv' : ''}
      style={{ backgroundColor: collectionColor }}>
      {changeColorButton}
      {imageButton}
<<<<<<< HEAD
      <NewCatButton uid={uid} collectionId={collectionId} itemIds={itemIds} />
=======
>>>>>>> master1
      {moreButton}
      {modalView && doneButton}
    </div>
  )
}

export default Footer
