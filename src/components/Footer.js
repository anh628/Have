import React from 'react'
import { connect } from 'react-redux'
import { uploadFile, deleteFile } from '../firebase/storageFunctions'
import {
  editImage,
  deleteCollection,
  deleteAllCompleted,
  setAllItemsCompleteness
} from '../firebase/collectionFunctions'
import { toggleModalStatus } from '../actions/actionCreator'
import { Icon } from 'antd'
class Footer extends React.Component {
  state = {
    showMenu: false
  }

  toggleShow = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render () {
    const collectionImageInputId = this.props.collectionView
      ? `${this.props.collectionId}-imageCV`
      : `${this.props.collectionId}-image`

    const imageButton = (
      <div className='footer-button'>
        <label>
          <input
            type='file'
            onChange={async () => {
              if (this.props.image) deleteFile(this.props.image)
              editImage(this.props.uid, this.props.collectionId, 'loading')
              const imageUrl = await uploadFile(
                collectionImageInputId,
                this.props.uid,
                this.props.collectionId
              )
              editImage(this.props.uid, this.props.collectionId, imageUrl)
            }}
            id={collectionImageInputId}
            name='files'
            accept='image/*'
            style={{ display: 'none' }} />
          <Icon type='picture' />
          <label className='description'>Add image</label>
        </label>
      </div>
    )

    /*
  Delete Note,
  Check all items
  Uncheck all items
  Delete checked items
  */

    const moreButton = (
      <div className='footer-button' onClick={() => this.toggleShow()}>
        <Icon type='menu' className='dropdown' id='more' />
        <label className='description'>More</label>
        <div
          className={`dropdown-content-more  ${
            this.state.showMenu ? 'show' : ''
          }`}
          id={`more-dropdown ${this.props.collectionId}`}
          onMouseLeave={() => this.toggleShow()}>
          <label
            onClick={() =>
              deleteCollection(this.props.uid, this.props.collectionId)
            }>
            Delete collection
          </label>
          {/* Only display the rest of the options if there are items in the collection */}
          {this.props.areItems ? (
            <div>
              {/* Only display if there are uncheck items */}
              {this.props.uncheckedItems ? (
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
              ) : null}

              {/* display if there are checked items */}
              {this.props.checkItems ? (
                <div>
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
                  <label
                    onClick={() =>
                      deleteAllCompleted(
                        this.props.uid,
                        this.props.collectionId
                      )
                    }>
                    Delete checked items
                  </label>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    )

    /*
  TODO: create color picker, ask Alexis for this one
  */
    const changeColorButton = (
      <div className='footer-button'>
        <Icon type='bg-colors' />
        <label className='description'>Change color</label>
      </div>
    )

    const doneButton = (
      <div className='footer-button'>
        <label
          onClick={() => this.props.toggleModalStatus(this.props.collectionId)}>
          Done
        </label>
      </div>
    )

    return (
      <div className='footer-bar' id={this.props.collectionView ? 'cv' : null}>
        {changeColorButton}
        {imageButton}
        {moreButton}
        {this.props.collectionView ? doneButton : null}
      </div>
    )
  }
}

const mapDispatchToProps = {
  toggleModalStatus
}
export default connect(
  null,
  mapDispatchToProps
)(Footer)
