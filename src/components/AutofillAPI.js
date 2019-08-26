import React from 'react'
import uuid from 'uuid'
import {
  addCollection,
  editImage,
  addItem
} from '../firebase/collectionFunctions'
import useFetchOnce from '../hooks/useFetchOnce'
import { Spin } from 'antd'
import Error from './Error'

const AutofillAPI = ({ uid }) => {
  const url = 'https://api.thecatapi.com/v1/images/search?limit=4'
  const jeopardy = 'http://jservice.io/api/random?count=4'

  const [data, loading, error] = useFetchOnce(url, {
    method: 'GET',
    headers: {
      'x-api-key': '06b0f108-ac07-485e-8ae2-ae7bc6151b92'
    }
  })

  const [jeopardyData] = useFetchOnce(jeopardy, {})

  const autofill = () => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const collectionId = uuid.v4()
        const picture = data[i].url
        let title, description, temperament
        if (data[i].breeds.length === 1) {
          title = data[i].breeds[0].id
          description = data[i].breeds[0].description
          temperament = data[i].breeds[0].temperament
        }
        addCollection(uid, collectionId, title || 'cat')
        editImage(uid, collectionId, 'loading')
        editImage(uid, collectionId, picture)
        if (description) {
          addItem(uid, collectionId, description)
        } else {
          addItem(uid, collectionId, jeopardyData[i].question)
        }
        if (temperament) {
          addItem(uid, collectionId, temperament)
        } else {
          addItem(uid, collectionId, `What is ${jeopardyData[i].answer}?`)
        }
      }
    }
  }

  if (loading) return <Spin size='large' />
  if (error) return <Error />

  return <button onClick={autofill}>Example</button>
}
export default AutofillAPI
