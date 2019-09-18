import { useState, useReducer, useCallback } from 'react'
import { fetchData } from '../utils/functions'
import useToggle from './useToggle'

const useFetch = (APIs, limit) => {
  const [loading, toggleLoading] = useToggle(false)
  const [error, setError] = useState(null)
  const [data, dispatchData] = useReducer((state, action) => {
    const data =
      state && Object.keys(state).length < APIs.length ? { ...state } : {}
    data[action.index] = [...action.data]

    return data
  }, {})

  const handleData = useCallback(async () => {
    toggleLoading()

    APIs.map(async function (API) {
      const [_data, _error] = await fetchData(`${API.api}${limit}`, API.option)
      dispatchData({ data: _data, index: API.api })
      if (!error) setError(_error)
    })
    toggleLoading()
  }, [APIs, limit])

  return [data, loading, error, handleData]
}

export default useFetch
