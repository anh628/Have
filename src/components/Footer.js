import React from 'react'
import Emoji from './Emoji'
import { uploadFile } from '../firebase/storageFunctions'
import {
  editImage,
  deleteCollection,
  deleteAllCompleted,
  setAllItemsCompleteness
} from '../firebase/collectionFunctions'
// import PropTypes from "prop-types";

const Footer = ({ uid, collectionId }) => {
  const collectionImageInputId = `${collectionId}-image`

  // should only add image or if existing image, would change it
  // TODO added in a hover label later
  const imageButton = (
    <div className='footer-button'>
      <label>
        <input
          type='file'
          onChange={async () => {
            const imageUrl = await uploadFile(
              collectionImageInputId,
              uid,
              collectionId
            )
            editImage(uid, collectionId, imageUrl)
          }}
          id={collectionImageInputId}
          name='files'
          style={{ display: 'none' }} />
        <Emoji
          symbol='📷' // TODO change emoji later
          label='imageUploader'
          style={{ filter: 'grayscale(100%)' }} />
        <p className='description'>Add image</p>
      </label>
    </div>
  )

  /*
  Delete Note,
  Uncheck all items
  Delete check items
  */
  const moreButton = (
    <div className='footer-button' onClick={() => toggleMenuName()}>
      <div className='dropdown' id='more'>
        <Emoji symbol='⋮' label='more' />
        <p className='description'>More</p>
      </div>
      <div
        className='dropdown-content-more'
        id={`more-dropdown ${collectionId}`}>
        {/* TODO: THIS DOES NOT SEEM TO WORK DELETE COLLECTION */}
        <label onClick={() => deleteCollection(uid, collectionId)}>
          Delete collection
        </label>
        <br />
        <label
          onClick={() => setAllItemsCompleteness(uid, collectionId, false)}>
          Uncheck all items
        </label>
        <br />
        <label onClick={() => deleteAllCompleted(uid, collectionId)}>
          Delete check items
        </label>
      </div>
    </div>
  )

  /*
    When the user clicks on the ⋮ emoji,
    toggle between hiding and showing the dropdown content
  */
  function toggleMenuName () {
    document
      .getElementById(`more-dropdown ${collectionId}`)
      .classList.toggle('show')
  }

  // TODO: this doesn't work, need to place elsewhere
  // Close the dropdown menu if the user clicks outside of it
  // window.onclick = function (event) {
  //   if (!event.target.matches('more-dropdown')) {
  //     const dropdowns = document.getElementsByClassName('dropdown-content')
  //     for (let i = 0; i < dropdowns.length; i++) {
  //       const openDropdown = dropdowns[i]
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show')
  //       }
  //     }
  //   }
  // }

  const changeColorButton = (
    <div className='footer-button'>
      <Emoji symbol='🎨' label='colorChanger' />
      <p className='description'>Change color</p>
    </div>
  )

  return (
    <div className='footer-bar'>
      {changeColorButton}
      {imageButton}
      {moreButton}
    </div>
  )
}

export default Footer
