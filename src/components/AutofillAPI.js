import React, { useEffect } from 'react'
import uuid from 'uuid'
import {
  addCollection,
  deleteItem,
  editTitle,
  editImage,
  addItem
} from '../firebase/collectionFunctions'
import { CAT_API, CAT_API_OPTION, JEOPARDY_API } from '../utils/constants'
import { catData } from '../utils/functions'
import useFetch from '../hooks/useFetch'
import useToggle from '../hooks/useToggle'
import { cat } from '../utils/cat'
import { Button, Spin, Tooltip, Icon } from 'antd'

const AutofillAPI = ({ uid, count, collectionId = null, itemIds }) => {
  const APIs = [
    { api: CAT_API, option: CAT_API_OPTION },
    { api: JEOPARDY_API, option: null }
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
        const { question, answer } = data[APIs[1].api][j]
        if (itemIds) {
          itemIds.map(id => deleteItem(uid, collectionID, id))
          editTitle(uid, collectionID, title || 'kitty')
        } else {
          addCollection(uid, collectionID, title || 'cat')
        }
        editImage(uid, collectionID, picture)
        if (description) await addItem(uid, collectionID, description)
        if (temperament) await addItem(uid, collectionID, temperament)
        if (!description && !temperament) {
          if (question && question.trim()) {
            await addItem(uid, collectionID, question)
          }
          if (answer && answer.trim()) {
            addItem(uid, collectionID, `What is ${answer}?`)
          }
        }
      }
    }
    if (Object.keys(data).length === APIs.length) {
      addInfo()
      if (loading) toggleLoading()
    }
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
      <div>
        {loading && spinner}
        <Tooltip title='Get new info' placement='top'>
          <Icon
            className='footer-button'
            component={cat}
            onClick={autofill}
            style={{
              margin: '5px',
              cursor: `${loading ? 'not-allowed' : 'pointer'}`
            }} />
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
