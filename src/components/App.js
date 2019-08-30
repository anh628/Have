import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useAuthState from '../hooks/useAuthState'
import useCollectionSnapshot from '../hooks/useCollectionSnapshot'
import { toggleModalStatus } from '../actions/actionCreator'
import { Spin, notification, Layout } from 'antd'
import AuthenticationButton from './AuthenticationButton'
import NewCollection from './NewCollection'
import List from './List'
import SingleCollectionView from './SingleCollectionView'
import ModalView from './ModalView'
import AutofillAPI from './AutofillAPI'

const App = () => {
  const open = useSelector(
    state =>
      (state.modal.filter(modal => modal.open) &&
        state.modal.filter(modal => modal.open)[0] &&
        state.modal.filter(modal => modal.open)[0].open) ||
      false
  )
  const modalId = useSelector(
    state =>
      (state.modal.filter(modal => modal.open) &&
        state.modal.filter(modal => modal.open)[0] &&
        state.modal.filter(modal => modal.open)[0].modalId) ||
      null
  )
  const dispatch = useDispatch()
  const [user] = useAuthState()
  const { uid, isAnonymous } = user

  const [collectionList, loading] = useCollectionSnapshot(uid)

  useEffect(() => {
    if (isAnonymous) {
      notification.open({
        message: 'Login to save your collection.',
        duration: 2
      })
    }
  }, [isAnonymous])

  const displayModal = open && (
    <ModalView
      collectionId={modalId}
      onClose={() => dispatch(toggleModalStatus(modalId))}
      componentDisplay={
        <SingleCollectionView
          uid={uid}
          collectionId={modalId}
          {...collectionList.filter(list => list.id === modalId)[0]} />
      } />
  )

  return (
    <div className='App'>
      {uid ? (
        <div>
          <Layout>
            <Layout.Header>
              <AuthenticationButton />
              <NewCollection uid={uid} />
            </Layout.Header>
            <Layout.Content>
              <AutofillAPI uid={uid} />
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
            </Layout.Content>
          </Layout>
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

export default App
