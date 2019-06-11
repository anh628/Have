import React from 'react'
import Modal from 'react-responsive-modal'

// pass in props of the children element we want
class ModalView extends React.Component {
  state = {
    open: this.props.open
  }

  openModal () {
    this.setState({
      open: true
    })
  }

  closeModal () {
    this.setState({
      open: false
    })
  }

  render () {
    return (
      <Modal
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
        on={this.state.open}
        onClose={this.state.open}>
        {this.props.componentDisplay}
      </Modal>
    )
  }
}
export default ModalView
