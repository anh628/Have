import './App.css'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import NewCollection from './components/NewCollection'
import React, { Component } from 'react'
import List from './components/List'
import ModalView from './components/ModalView'
import { toggleModalStatus } from './actions/actionCreator'
import CollectionView from './components/CollectionView'

class App extends Component {
  render () {
    const displayModal = this.props.open ? (
      <ModalView
        collectionId={this.props.modalId}
        onClose={() => this.props.toggleModalStatus(this.props.modalId)}
        componentDisplay={
          <CollectionView
            uid={this.props.uid}
            collectionId={this.props.modalId} />
        } />
    ) : null

    return (
      <div className='App'>
        <AuthenticationButton />
        <header className='App-header'>
          <NewCollection uid={this.props.uid} />
        </header>
        <List uid={this.props.uid} />
        {displayModal}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const open =
    state.modal.filter(modal => modal.open) &&
    state.modal.filter(modal => modal.open)[0] &&
    state.modal.filter(modal => modal.open)[0].open
  const modalId =
    state.modal.filter(modal => modal.open) &&
    state.modal.filter(modal => modal.open)[0] &&
    state.modal.filter(modal => modal.open)[0].modalId
  return {
    open: open || false,
    uid: state.firebase.auth.uid,
    modalId: modalId || null
  }
}

const mapDispatchToProps = {
  toggleModalStatus
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
