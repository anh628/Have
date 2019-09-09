import { useState, useReducer, useCallback } from 'react'
import { fetchData } from '../utils/functions'
import useToggle from './useToggle'

const useFetch = (url, limit, option) => {
  const [loading, toggleLoading] = useToggle(false)
  const [error, setError] = useState(null)
  const [data, dispatchData] = useReducer((state, action) => {
    const data = state && state.length < url.length ? [...state] : []
    data.push(action)
    return data
  }, [])

  const handleData = useCallback(async () => {
    toggleLoading()
    for (let i = 0; i < url.length; i++) {
      const [_data, _error] = await fetchData(`${url[i]}${limit}`, option[i])
      dispatchData(_data)
      setError(_error)
    }

    toggleLoading()
  }, [url, limit, option])

  return [data, loading, error, handleData]
}

export default useFetch
