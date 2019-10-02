import React from 'react'
import { uploadFile, deleteFile } from '../firebase/storageFunctions'
import {
  editImage,
  deleteCollection,
  deleteAllCompleted,
  setAllItemsCompleteness
} from '../firebase/collectionFunctions'
import useToggle from '../hooks/useToggle'
import { Icon, Tooltip } from 'antd'
import Color from './Color'
import AutofillAPI from './AutofillAPI'

const Footer = ({
  collectionColor,
  areItems,
  checkItems,
  collectionId,
  image,
  uid,
  uncheckedItems,
  modalView = false,
  itemIds,
  toggleLoadingImage,
  onClose
}) => {
  const [showMenu, toggle] = useToggle(false)

  const collectionImageInputId = modalView
    ? `${collectionId}-imageMV`
    : `${collectionId}-image`

  const imageButton = (
    <div className='footer-button'>
      <Tooltip title={`${image ? 'Change' : 'Add'} cover art`} placement='top'>
        <label>
          <input
            type='file'
            onChange={async () => {
              if (image) await deleteFile(image)
              toggleLoadingImage()
              const url = await uploadFile(
                collectionImageInputId,
                uid,
                collectionId
              )
              editImage(uid, collectionId, url)
              toggleLoadingImage()
            }}
            id={collectionImageInputId}
            name='files'
            accept='image/*'
            style={{ display: 'none' }} />
          <Icon type='picture' onClick={showMenu ? toggle : null} />
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
    <div className='footer-button' onClick={toggle}>
      <Tooltip title='More' placement='top'>
        <Icon type='menu' className='dropdown' id='more' />
        <div
          className={`dropdown-content-more  ${showMenu ? 'show' : ''}`}
          id={`more-dropdown ${collectionId}`}
          onClick={toggle}>
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
    <div className='footer-button' style={{ cursor: 'default' }}>
      <label onClick={() => onClose()}>Done</label>
    </div>
  )
  const catButton = (
    <AutofillAPI
      uid={uid}
      collectionId={collectionId}
      itemIds={itemIds}
      count={1} />
  )

  return (
    <div
      className='footer-bar'
      id={modalView ? 'cv' : ''}
      style={{ backgroundColor: collectionColor }}>
      {changeColorButton}
      {imageButton}
      {catButton}
      {moreButton}
      {modalView && doneButton}
    </div>
  )
}

export default Footer
