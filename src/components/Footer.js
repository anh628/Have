import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadFile, deleteFile } from '../firebase/storageFunctions'
import {
  editImage,
  deleteCollection,
  deleteAllCompleted,
  setAllItemsCompleteness
} from '../firebase/collectionFunctions'
import { toggleModalStatus } from '../actions/actionCreator'
import { Icon, Tooltip } from 'antd'
import Color from './Color'
import useDownloadURL from '../hooks/useDownloadURL'

const Footer = ({
  areItems,
  checkItems,
  collectionId,
  image,
  uid,
  uncheckedItems,
  modalView = false
}) => {
  const [showMenu, toggleMenu] = useState(false)
  const [downloadURL] = useDownloadURL(uid, collectionId)
  const dispatch = useDispatch()

  const collectionImageInputId = modalView
    ? `${collectionId}-imageMV`
    : `${collectionId}-image`

  const imageButton = (
    <div className='footer-button'>
      <Tooltip
        title={`${image ? 'Change' : 'Add'} cover art.`}
        placement='bottom'>
        <label>
          <input
            type='file'
            onChange={async () => {
              if (image) deleteFile(image)
              uploadFile(collectionImageInputId, uid, collectionId)
              editImage(uid, collectionId, downloadURL)
            }}
            id={collectionImageInputId}
            name='files'
            accept='image/*'
            style={{ display: 'none' }} />
          <Icon type='picture' />
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
    <div className='footer-button' onClick={() => toggleMenu(!showMenu)}>
      <Tooltip title='More' placement='bottom'>
        <Icon type='menu' className='dropdown' id='more' />
        <div
          className={`dropdown-content-more  ${showMenu ? 'show' : ''}`}
          id={`more-dropdown ${collectionId}`}
          onClick={() => toggleMenu(false)}>
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
    <div className='footer-button'>
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
    <div className='footer-bar' id={modalView ? 'cv' : ''}>
      {changeColorButton}
      {imageButton}
      {moreButton}
      {modalView && doneButton}
    </div>
  )
}

export default Footer
