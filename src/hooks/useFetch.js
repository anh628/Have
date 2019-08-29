import { useState, useEffect, useCallback } from 'react'
import { fetchData } from '../utils/functions'

const useFetch = (url, limit, option) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const apiURL = `${url}${limit}`

  const handleData = useCallback(() => {
    fetchData(apiURL, option, setData)
  }, [apiURL, option])

  useEffect(() => {
    setLoading(true)
    fetchData(apiURL, option, setData, setError)
    setLoading(false)
  }, [])

  return [data, loading, error, handleData]
}

export default useFetch
