import React from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'
import { toggleModalStatus } from '../actions/actionCreator'

const ModalView = ({
  open,
  collectionColor,
  collectionId,
  toggleModalStatus,
  componentDisplay
}) => {
  return (
    <Modal
      closeOnOverlayClick
      closeOnEsc
      center
      open={open}
      styles={{
        modal: {
          backgroundColor: collectionColor,
          width: '400px',
          padding: '1px',
          borderRadius: '5px'
        }
      }}
      onClose={() => toggleModalStatus(collectionId)}
      showCloseIcon>
      {componentDisplay}
    </Modal>
  )
}

const mapStateToProps = (state, props) => {
  const open =
    state.modal.filter(modal => modal.modalId === props.collectionId) &&
    state.modal.filter(modal => modal.modalId === props.collectionId)[0] &&
    state.modal.filter(modal => modal.modalId === props.collectionId)[0].open

  return { open: open || false }
}

const mapDispatchToProps = {
  toggleModalStatus
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalView)
