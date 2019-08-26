import { useState, useEffect } from 'react'

const useFetch = (url, option) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(url, option)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
    setLoading(false)
  }, [url, option])

  return [data, loading, error]
}

export default useFetch
