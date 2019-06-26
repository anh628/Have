import React from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'

// TODO: FIND A WAY TO FOCUS ON ADDING NEW ITEM INPUT
const ModalView = ({ open, onClose, componentDisplay }) => {
  return (
    <Modal
      closeOnOverlayClick
      closeOnEsc
      center
      open={open}
      styles={{
        modal: {
          backgroundColor: 'transparent',
          width: '400px',
          padding: '1px',
          borderRadius: '5px'
        }
      }}
      onClose={onClose}
      showCloseIcon={false}
      focusTrapped={true}>
      {componentDisplay}
    </Modal>
  )
}

const mapStateToProps = (state, props) => {
  const open =
    state.modal.filter(modal => modal.open === props.collectionId) &&
    state.modal.filter(modal => modal.modalId === props.collectionId)[0] &&
    state.modal.filter(modal => modal.modalId === props.collectionId)[0].open

  return { open: open || false }
}

export default connect(
  mapStateToProps,
  null
)(ModalView)
