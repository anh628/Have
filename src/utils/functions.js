import uuid from 'uuid'
import { CAT_API, CAT_API_OPTION, JEOPARDY_API } from './constants'
import useFetch from '../hooks/useFetch'
import {
  addCollection,
  editImage,
  addItem,
  deleteItem,
  editTitle
} from '../firebase/collectionFunctions'

export const catData = data => {
  return {
    picture: data.url,
    title: data.breeds[0] && data.breeds[0].id,
    description: data.breeds[0] && data.breeds[0].description,
    temperament: data.breeds[0] && data.breeds[0].temperament
  }
}

export const fetchData = async (url, option) => {
  let error
  const response = await fetch(url, option).catch(e => (error = e))
  const json = await response.json()
  return [json, error]
}
