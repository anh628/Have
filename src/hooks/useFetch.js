import { useState, useEffect, useCallback } from 'react'
import { fetchData } from '../utils/functions'
import useToggle from './useToggle'

const useFetch = (url, limit, option) => {
  const [loading, setLoading] = useToggle(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const apiURL = `${url}${limit}`

  const handleData = useCallback(async () => {
    setLoading()
    const [_data, _error] = await fetchData(apiURL, option)
    setData(_data)
    setError(_error)
    setLoading()
  }, [apiURL, option])

  useEffect(() => {
    handleData()
  }, [])

  return [data, loading, error, handleData]
}

export default useFetch
