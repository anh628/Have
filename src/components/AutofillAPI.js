import React from 'react'
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
import { cat } from '../utils/cat'
import { Button, Spin, Tooltip, Icon } from 'antd'

const AutofillAPI = ({ uid, count, collectionId = null, itemIds }) => {
  const [data, catLoading, catError, getData] = useFetch(
    CAT_API,
    count,
    CAT_API_OPTION
  )

  const [jeopardyData, jeopardyLoading, jeopardyError, getText] = useFetch(
    JEOPARDY_API,
    count,
    {}
  )
  const autofill = async () => {
    await Promise.all([getData(), getText()])

    for (let i = 0; i < data.length; i++) {
      let collectionID = collectionId || uuid.v4()
      const { picture, title, description, temperament } = catData(data[i])
      const { question, answer } = jeopardyData[i]

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
        if (question.trim()) await addItem(uid, collectionID, question)
        if (answer.trim()) addItem(uid, collectionID, `What is ${answer}?`)
      }
    }
  }
  const loading = catLoading || jeopardyLoading
  const error = catError || jeopardyError

  if (loading) {
    return (
      <Spin
        size='large'
        style={{
          position: 'absolute',
          top: '-90px',
          left: 'calc(50 %)'
        }} />
    )
  }
  if (error) return <p>Error</p>

  if (itemIds) {
    return (
      <Tooltip title='Get new info' placement='top'>
        <Icon
          className='footer-button'
          component={cat}
          onClick={autofill}
          style={{ margin: '5px' }} />
      </Tooltip>
    )
  }

  return (
    <Button onClick={autofill} className='Example' style={{ margin: '5px' }}>
      Example
    </Button>
  )
}
export default AutofillAPI
