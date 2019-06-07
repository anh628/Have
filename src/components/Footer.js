import React from 'react'
import Emoji from './Emoji'
import { uploadFile } from '../firebase/storageFunctions'
import {
  editImage,
  deleteCollection,
  deleteAllCompleted,
  setAllItemsCompleteness
} from '../firebase/collectionFunctions'
import { connect } from 'react-redux'

// TODO: have it so only the relevant add more buttons are shown
class Footer extends React.Component {
  state = {
    showMenu: false
  }

  toggleShow = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render () {
    const collectionImageInputId = `${this.props.collectionId}-image`

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
                this.props.uid,
                this.props.collectionId
              )
              editImage(this.props.uid, this.props.collectionId, imageUrl)
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
      <div className='footer-button' onClick={() => this.toggleShow()}>
        <Emoji symbol='⋮' label='more' className='dropdown' id='more' />
        <p className='description'>More</p>

        <div
          className={`dropdown-content-more  ${
            this.state.showMenu ? 'show' : ''
          }`}
          id={`more-dropdown ${this.props.collectionId}`}
          onMouseLeave={() => this.toggleShow()}>
          <label
            onClick={() =>
              this.props.deleteCollection(
                this.props.uid,
                this.props.collectionId
              )
            }>
            Delete collection
          </label>
          <br />
          <label
            onClick={() =>
              setAllItemsCompleteness(
                this.props.uid,
                this.props.collectionId,
                true
              )
            }>
            Check all items
          </label>
          <br />
          <label
            onClick={() =>
              setAllItemsCompleteness(
                this.props.uid,
                this.props.collectionId,
                false
              )
            }>
            Uncheck all items
          </label>
          <br />
          <label
            onClick={() =>
              deleteAllCompleted(this.props.uid, this.props.collectionId)
            }>
            Delete checked items
          </label>
        </div>
      </div>
    )

    /*
  TODO: create color picker, ask Alexis for this one
  */
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
}

const mapDispatchToProps = {
  deleteCollection
}
export default connect(
  null,
  mapDispatchToProps
)(Footer)
