import { useState, useEffect, useCallback } from 'react'
import { fetchData } from '../utils/functions'

const useFetch = (url, limit, option) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const apiURL = `${url}${limit}`

  const handleData = useCallback(async () => {
    const [_data, _error] = await fetchData(apiURL, option)
    setData(_data)
    setError(_error)
  }, [apiURL, option])

  useEffect(() => {
    setLoading(true)
    handleData()
    setLoading(false)
  }, [])

  return [data, loading, error, handleData]
}

export default useFetch
