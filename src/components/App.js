import { updateCollectionIndexes } from '../firebase/collectionFunctions'
import SingleCollectionModalView from './SingleCollectionModalView'
import useCollectionSnapshot from '../hooks/useCollectionSnapshot'
import React, { useEffect, useCallback, useState } from 'react'
import AuthenticationButton from './AuthenticationButton'
import { useSelector, useDispatch } from 'react-redux'
import { setModalIds } from '../actions/actionCreator'
import { DragDropContext } from 'react-beautiful-dnd'
import { reorder, move } from '../utils/functions'
import { Spin, notification, Layout } from 'antd'
import useAuthState from '../hooks/useAuthState'
import { isEqual, chunk, flatten } from 'lodash'
import useDebounce from '../hooks/useDebounce'
import NewCollection from './NewCollection'
import AutofillAPI from './AutofillAPI'
import List from './List'

const App = () => {
  const dispatch = useDispatch()

  const [user] = useAuthState()
  const { uid, isAnonymous } = user

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

  const [collectionList, loading] = useCollectionSnapshot(uid)
  const [orderCollection, updateOrderCollection] = useState([])

  const [orderedItems, updateOrderedItems] = useState([])

  const debouncedOrderCollection = useDebounce(
    orderCollection => {
      const list = flatten(orderCollection)
      if (!isEqual(collectionList, list)) {
        updateCollectionIndexes(uid, list)
      }
    },
    5000,
    { maxWait: 10000, trailing: true }
  )

  useEffect(() => {
    if (isAnonymous) {
      notification.open({
        message: 'Login to save your collection.',
        duration: 2
      })
    }
  }, [isAnonymous])

  // make sure any changes outside of order is being reflected
  useEffect(() => {
    dispatch(setModalIds(collectionList.map(collection => collection.id)))

    const orderCollectionLength = flatten(orderCollection).length

    if (orderCollectionLength < collectionList.length) {
      const list = flatten(orderCollection)
      list.push(collectionList[collectionList.length - 1])
      updateOrderCollection(chunk(list, 3))
    } else if (orderCollectionLength > collectionList.length) {
      const list = flatten(orderCollection).filter(
        collection =>
          collectionList.findIndex(list => list.id === collection.id) !== -1
      )

      updateOrderCollection(chunk(list, 3))
    } else if (orderCollectionLength === collectionList.length) {
      const list = flatten(orderCollection).map((collection, index) => ({
        ...collectionList.find(list => list.id === collection.id),
        index
      }))
      updateOrderCollection(chunk(list, 3))
    }
    // eslint-disable-next-line
  }, [collectionList, dispatch])

  const onDragEnd = useCallback(
    async e => {
      const { destination, source, type } = e

      const getIndex = droppableId => +droppableId.split(' ')[1]
      const getRow = index => orderCollection[index]

      // moving items inside a list
      if (type === 'list') {
        // dropped outside the list
        if (!destination || source.index === destination.index) {
          return
        }
        if (source.droppableId === destination.droppableId) {
          const newList = reorder(orderedItems, source.index, destination.index)
          updateOrderedItems(newList)
        }
      }

      // moving collection around
      if (type === 'overview') {
        // dropped outside the list
        if (
          !destination ||
          (source.index === destination.index &&
            source.droppableId === destination.droppableId)
        ) {
          return
        }

        // within same row
        if (source.droppableId === destination.droppableId) {
          const index = getIndex(source.droppableId)

          const newList = reorder(
            getRow(index),
            source.index,
            destination.index
          )

          updateOrderCollection(
            orderCollection.map((collection, i) =>
              i === index ? newList : collection
            )
          )
        } else {
          // between different rows
          const result = move(
            getRow(getIndex(source.droppableId)),
            getRow(getIndex(destination.droppableId)),
            source,
            destination
          )
          const sourceIndex = getIndex(source.droppableId)
          const destinationIndex = getIndex(destination.droppableId)
          const newList = orderCollection.map((collection, i) =>
            i === sourceIndex
              ? result[0]
              : i === destinationIndex
                ? result[1]
                : collection
          )

          updateOrderCollection(chunk(flatten(newList), 3))
        }
        debouncedOrderCollection(orderCollection)
      }
    },

    [orderedItems, orderCollection, debouncedOrderCollection]
  )

  const displayModal = open && (
    <SingleCollectionModalView
      open={open}
      uid={uid}
      collectionId={modalId}
      {...collectionList.filter(list => list.id === modalId)[0]}
      orderedItems={orderedItems}
      updateOrderedItems={updateOrderedItems} />
  )
  return (
    <div className='App'>
      {uid ? (
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
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
                    orderCollection={orderCollection} />
                )}
                {displayModal}
              </Layout.Content>
            </Layout>
          </DragDropContext>
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
