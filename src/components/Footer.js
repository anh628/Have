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
import NewCatButton from './NewCatButton'

const Footer = ({
  collectionColor,
  areItems,
  checkItems,
  collectionId,
  image,
  uid,
  uncheckedItems,
  modalView = false,
  itemIds
}) => {
  const [showMenu, toggleMenu] = useState(false)
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
          <Icon type='picture' onClick={() => toggleMenu(false)} />
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
      <Tooltip title='More' placement='top'>
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
    <div className='footer-button' onClick={() => toggleMenu(false)}>
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
      <NewCatButton uid={uid} collectionId={collectionId} itemIds={itemIds} />
      {moreButton}
      {modalView && doneButton}
    </div>
  )
}

export default Footer
