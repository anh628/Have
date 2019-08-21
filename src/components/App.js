import { connect } from 'react-redux'
import AuthenticationButton from './AuthenticationButton'
import NewCollection from './NewCollection'
import React from 'react'
import List from './List'
import ModalView from './ModalView'
import { toggleModalStatus } from '../actions/actionCreator'
import SingleCollectionView from './SingleCollectionView'
import { Spin } from 'antd'
import { firebase } from '../firebase/firebase'
import useAuthState from '../hooks/useAuthState'
import useCollectionSnapshot from '../hooks/useCollectionSnapshot'

const App = ({ open, modalId, toggleModalStatus }) => {
  const [user] = useAuthState(firebase.auth())
  const { uid, isAnonymous } = user

  const [collectionList, loading] = useCollectionSnapshot(uid)

  const displayModal = open ? (
    <ModalView
      collectionId={modalId}
      onClose={() => toggleModalStatus(modalId)}
      componentDisplay={
        <SingleCollectionView
          uid={uid}
          collectionId={modalId}
          {...collectionList.filter(list => list.id === modalId)[0]} />
      } />
  ) : null

  return (
    <div className='App'>
      {uid ? (
        <div>
          <AuthenticationButton />
          <NewCollection uid={uid} />
          {loading ? (
            <Spin
              size='large'
              style={{
                fontSize: '20px',
                position: 'absolute',
                left: '50%',
                top: '30%'
              }} />
          ) : (
            <List
              uid={uid}
              isAnonymous={isAnonymous}
              collectionList={collectionList} />
          )}
          {displayModal}
        </div>
      ) : (
        <Spin
          size='large'
          style={{
            fontSize: '20px',
            position: 'absolute',
            left: '50%',
            top: '30%'
          }} />
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
