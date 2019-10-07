import SingleCollectionModalView from './SingleCollectionModalView'
import useCollectionSnapshot from '../hooks/useCollectionSnapshot'
import AuthenticationButton from './AuthenticationButton'
import { useSelector, useDispatch } from 'react-redux'
import { setModalIds } from '../actions/actionCreator'
import { Spin, notification, Layout } from 'antd'
import useAuthState from '../hooks/useAuthState'
import NewCollection from './NewCollection'
import React, { useEffect } from 'react'
import AutofillAPI from './AutofillAPI'
import List from './List'

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

  useEffect(() => {
    dispatch(setModalIds(collectionList.map(collection => collection.id)))
    // eslint-disable-next-line
  }, [collectionList])

  const displayModal = open && (
    <SingleCollectionModalView
      open={open}
      uid={uid}
      collectionId={modalId}
      {...collectionList.filter(list => list.id === modalId)[0]} />
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
              <AutofillAPI uid={uid} count={2} />
              {loading ? (
                <Spin
                  size='large'
                  style={{
                    fontSize: '20px',
                    position: 'absolute',
                    left: '50%'
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
            left: '50%'
          }} />
      )}
    </div>
  )
}

export default App
