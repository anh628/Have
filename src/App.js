import './App.css'
import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import NewCollection from './components/NewCollection'
import React from 'react'
import List from './components/List'
import ModalView from './components/ModalView'
import { toggleModalStatus } from './actions/actionCreator'
import CollectionView from './components/CollectionView'
import { Icon } from 'antd'

const App = ({ open, modalId, toggleModalStatus, uid, anon }) => {
  const displayModal = open ? (
    <ModalView
      collectionId={modalId}
      onClose={() => toggleModalStatus(modalId)}
      componentDisplay={<CollectionView uid={uid} collectionId={modalId} />} />
  ) : null

  return (
    <div className='App'>
<<<<<<< HEAD
      {uid ? (
        <div>
          <AuthenticationButton />
          <header className='App-header'>
            <NewCollection uid={uid} />
          </header>
          <List uid={uid} anon={anon} />
          {displayModal}
        </div>
      ) : (
        <Icon type='loading' />
      )}
||||||| merged common ancestors
      <AuthenticationButton />
      <header className='App-header'>
        <NewCollection uid={uid} />
      </header>
      <List uid={uid} />
      {displayModal}
=======
      {uid ? (
        <div>
          <AuthenticationButton />
          <header className='App-header'>
            <NewCollection uid={uid} />
          </header>
          <List uid={uid} />
          {displayModal}
        </div>
      ) : (
        <Icon type='loading' />
      )}
>>>>>>> dev1
    </div>
  )
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
    modalId: modalId || null,
    anon: state.firebase.auth.isAnonymous
  }
}

const mapDispatchToProps = {
  toggleModalStatus
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
