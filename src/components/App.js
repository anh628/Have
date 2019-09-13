import useCollectionSnapshot from '../hooks/useCollectionSnapshot'
import { toggleModalStatus } from '../actions/actionCreator'
import AuthenticationButton from './AuthenticationButton'
import SingleCollectionView from './SingleCollectionView'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import React, { useEffect, useCallback } from 'react'
import { Spin, notification, Layout } from 'antd'
import useAuthState from '../hooks/useAuthState'
// import { reorder } from '../utils/functions'
import NewCollection from './NewCollection'
import AutofillAPI from './AutofillAPI'
import ModalView from './ModalView'
import List from './List'
import { editCollectionIndex } from '../firebase/collectionFunctions'

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

  const onDragEnd = useCallback(e => {
    const { reason, destination, source, type } = e
    if (reason === 'DROP' && destination) {
      if (type === 'LIST') {
        const destinationIndex = collectionList[destination.index].index
        const sourceIndex = collectionList[source.index].index
        editCollectionIndex(
          uid,
          collectionList[source.index].id,
          destinationIndex
        )
        editCollectionIndex(
          uid,
          collectionList[destination.index].id,
          sourceIndex
        )
      }
      // return setOrderedLessons(
      //   handleDrop(lessons, source, destination, draggableId)
      // )
    }
  })

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
              <AutofillAPI uid={uid} count={2} />
              <DragDropContext onDragEnd={onDragEnd}>
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
              </DragDropContext>
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
