import { useState, useEffect } from 'react'

// fetch data from api only once
const useFetchOnce = (url, option) => {
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
  }, [])

  return [data, loading, error]
}

export default useFetchOnce
