import {
  addCollection,
  deleteItem,
  editTitle,
  editImage,
  addItem
} from '../firebase/collectionFunctions'
import { CAT_API, CAT_API_OPTION, JOKE_API } from '../utils/constants'
import { Button, Spin, Tooltip, Icon, Popconfirm } from 'antd'
import { catData } from '../utils/functions'
import useToggle from '../hooks/useToggle'
import useFetch from '../hooks/useFetch'
import React, { useEffect } from 'react'
import { cat } from '../utils/cat'
import uuid from 'uuid'

const AutofillAPI = ({ uid, count, collectionId = null, itemIds }) => {
  const APIs = [
    { api: CAT_API, option: CAT_API_OPTION },
    { api: JOKE_API, option: null }
  ]
  const [data, _loading, error, getData] = useFetch(APIs, count)
  const [loading, toggleLoading] = useToggle(_loading)

  useEffect(() => {
    const addInfo = async () => {
      for (let j = 0; j < count; j++) {
        let collectionID = collectionId || uuid.v4()
        const { picture, title, description, temperament } = catData(
          data[APIs[0].api][j]
        )
        const { setup, punchline } = data[APIs[1].api][j]
        if (itemIds) {
          itemIds.map(id => deleteItem(uid, collectionID, id))
          editTitle(uid, collectionID, title || 'kitty')
        } else {
          addCollection(uid, collectionID, title || 'cat')
        }
        editImage(uid, collectionID, picture)
        if (description) await addItem(uid, collectionID, description, 0)
        if (temperament) await addItem(uid, collectionID, temperament, 1)
        if (!description && !temperament) {
          if (setup && setup.trim()) {
            await addItem(uid, collectionID, setup, 0)
          }
          if (punchline && punchline.trim()) {
            addItem(uid, collectionID, punchline, 1)
          }
        }
      }
    }
    if (Object.keys(data).length === APIs.length) {
      addInfo()
      if (loading) toggleLoading()
    }
    // eslint-disable-next-line
  }, [data])

  const autofill = async () => {
    if (loading) return null
    toggleLoading()
    await getData()
  }

  const spinner = (
    <Spin
      size='large'
      style={{
        position: 'absolute',
        top: '-90px',
        left: 'calc(50 %)'
      }} />
  )

  if (error) return <p>Error</p>

  if (itemIds) {
    return (
      <div className='footer-button'>
        {loading && spinner}
        <Tooltip title='Get new info' placement='top'>
          <Popconfirm
            title='Are you sure? List will be overwritten.'
            placement='topLeft'
            onConfirm={() => autofill()}
            okText='Yes'
            cancelText='No'>
            <Icon
              className='footer-button'
              component={cat}
              style={{
                margin: '5px',
                cursor: `${loading ? 'not-allowed' : 'pointer'}`
              }} />
          </Popconfirm>
        </Tooltip>
      </div>
    )
  }

  return (
    <div>
      {loading && spinner}
      <Button
        onClick={autofill}
        className='Example'
        style={{
          margin: '5px',
          cursor: `${loading ? 'not-allowed' : 'pointer'}`
        }}>
        Example
      </Button>
    </div>
  )
}
export default AutofillAPI
