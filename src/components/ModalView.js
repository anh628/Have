import React from 'react'
import Modal from 'react-responsive-modal'
import { useSelector } from 'react-redux'

// TODO: FIND A WAY TO FOCUS ON ADDING NEW ITEM INPUT
const ModalView = ({ collectionId, onClose, componentDisplay }) => {
  const open = useSelector(
    state =>
      (state.modal.filter(modal => modal.open === collectionId) &&
        state.modal.filter(modal => modal.modalId === collectionId)[0] &&
        state.modal.filter(modal => modal.modalId === collectionId)[0].open) ||
      false
  )
  return (
    <Modal
      closeOnOverlayClick
      closeOnEsc
      center
      open={open}
      styles={{
        modal: {
          backgroundColor: 'transparent'
          // width: '400px',
          // padding: '1px',
          // borderRadius: '5px'
        }
      }}
      onClose={onClose}
      showCloseIcon={false}
      focusTrapped={true}
      focusTrapOptions={{ returnFocusOnDeactivate: true }}>
      {componentDisplay}
    </Modal>
  )
}

export default ModalView
