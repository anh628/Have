import React from 'react'
import Modal from 'react-responsive-modal'
import CollectionView from './CollectionView'

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
        closeOnEsc={true}
        open={this.props.open}
        styles={{
          modal: {
            backgroundColor: this.props.collectionColor,
            width: '400px'
          }
        }}
        onClose={(()=>!this.props.open}>
        <CollectionView
          uid={this.props.uid}
          collectionId={this.props.collectionId}
          title={this.props.title} />
      </Modal>
    )
  }
}
export default ModalView
