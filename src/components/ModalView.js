import React from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'
import { toggleModalStatus } from '../actions/actionCreator'
// pass in props of the children element we want
class ModalView extends React.Component {
  render () {
    return (
      <Modal
        modalId={this.props.modalId}
        closeOnOverlayClick
        closeOnEsc
        center
        open={this.props.open}
        styles={{
          modal: {
            backgroundColor: this.props.collectionColor,
            width: '400px'
          }
        }}
        on={this.props.open}
        onClose={() => toggleModalStatus()}>
        {this.props.componentDisplay}
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  open: state.modal.open
})

const mapDispatchToProps = {
  toggleModalStatus
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalView)
