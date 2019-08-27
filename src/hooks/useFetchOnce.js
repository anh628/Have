import { useState, useEffect } from 'react'

// fetch data from api only once
const useFetchOnce = (url, limit, option) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const apiURL = `${url}${limit}`

  useEffect(() => {
    setLoading(true)
    fetch(apiURL, option)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
    setLoading(false)
  }, [])

  return [data, loading, error]
}

export default useFetchOnce
