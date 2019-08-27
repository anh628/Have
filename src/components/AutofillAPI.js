import React from 'react'
import uuid from 'uuid'
import {
  addCollection,
  editImage,
  addItem
} from '../firebase/collectionFunctions'
import { CAT_API, CAT_API_OPTION, JEOPARDY_API } from '../utils/constants'
import { catData } from '../utils/catData'
import useFetchOnce from '../hooks/useFetchOnce'
import { Button, Spin } from 'antd'

const AutofillAPI = ({ uid }) => {
  const [data, loading, error] = useFetchOnce(CAT_API, 4, CAT_API_OPTION)

  const [jeopardyData] = useFetchOnce(JEOPARDY_API, 4, {})

  const autofill = async () => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const collectionId = uuid.v4()
        const { picture, title, description, temperament } = catData(data[i])
        const { question, answer } = jeopardyData[i]

        addCollection(uid, collectionId, title || 'cat')

        editImage(uid, collectionId, 'loading')
        editImage(uid, collectionId, picture)

        if (description) await addItem(uid, collectionId, description)
        if (temperament) await addItem(uid, collectionId, temperament)
        if (!description && !temperament) {
          if (question) await addItem(uid, collectionId, question)
          addItem(uid, collectionId, `What is ${answer}?`)
        }
      }
    }
  }

  if (loading) return <Spin size='large' />
  if (error) return <p>Error</p>

  return (
    <Button onClick={autofill} className='Example' style={{ margin: '5px' }}>
      Example
    </Button>
  )
}
export default AutofillAPI
