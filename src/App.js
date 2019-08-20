import { connect } from 'react-redux'
import AuthenticationButton from './components/AuthenticationButton'
import NewCollection from './components/NewCollection'
import React from 'react'
import List from './components/List'
import ModalView from './components/ModalView'
import { toggleModalStatus } from './actions/actionCreator'
import CollectionView from './components/CollectionView'
import { Icon } from 'antd'
import { firebase } from './firebase/firebase'
import useAuthState from './hooks/useAuthState'

const App = ({ open, modalId, toggleModalStatus }) => {
  const [user] = useAuthState(firebase.auth())
  const { uid, isAnonymous } = user

  const displayModal = open ? (
    <ModalView
      collectionId={modalId}
      onClose={() => toggleModalStatus(modalId)}
      componentDisplay={<CollectionView uid={uid} collectionId={modalId} />} />
  ) : null

  return (
    <div className='App'>
      {uid ? (
        <div>
          <AuthenticationButton />
          <NewCollection uid={uid} />
          <List uid={uid} anon={isAnonymous} />
          {displayModal}
        </div>
      ) : (
        <Icon type='loading' />
      )}
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
