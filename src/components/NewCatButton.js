import React, { useState } from 'react'
import {
  editImage,
  addItem,
  deleteItem,
  editTitle
} from '../firebase/collectionFunctions'
import { CAT_API, CAT_API_OPTION, JEOPARDY_API } from '../utils/constants'
import { Icon, Spin, Tooltip } from 'antd'
import { cat } from '../utils/cat'
import { catData } from '../utils/functions'
import useFetch from '../hooks/useFetch'

const NewCatButton = ({ uid, collectionId, itemIds }) => {
  const [loading, setLoading] = useState(false)

  const [data, , , getData] = useFetch(CAT_API, 1, CAT_API_OPTION)
  const [jeopardyData, , , getText] = useFetch(JEOPARDY_API, 1, {})

  const deleteItems = () => {
    itemIds.map(id => deleteItem(uid, collectionId, id))
  }

  const newData = async () => {
    setLoading(true)
    getData()
    getText()
    if (data && jeopardyData) {
      const { picture, title, description, temperament } = catData(data[0])
      const { question, answer } = jeopardyData[0]

      deleteItems()

      editTitle(uid, collectionId, title || 'kitty')
      editImage(uid, collectionId, picture)
      if (description) await addItem(uid, collectionId, description)
      if (temperament) await addItem(uid, collectionId, temperament)
      if (!description && !temperament) {
        if (question.trim()) await addItem(uid, collectionId, question)
        if (answer.trim()) addItem(uid, collectionId, `What is ${answer}?`)
      }
    }
    setLoading(false)
  }

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

  return (
    <Tooltip title='Get new info' placement='top'>
      <Icon
        className='footer-button'
        component={cat}
        onClick={newData}
        style={{ margin: '5px' }} />
    </Tooltip>
  )
}
export default NewCatButton
