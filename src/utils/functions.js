export const catData = data => {
  return {
    picture: data.url,
    title: data.breeds[0] && data.breeds[0].id,
    description: data.breeds[0] && data.breeds[0].description,
    temperament: data.breeds[0] && data.breeds[0].temperament
  }
}

export const fetchData = (url, option, setData, setError) => {
  return fetch(url, option)
    .then(res => res.json())
    .then(setData)
    .catch(setError)
}
