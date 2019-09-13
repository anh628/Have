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
  if (error) return [null, error]
  const json = await response.json()
  return [json, error]
}

// startIndex = starting position
// endIndex = ending position
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  // storing what got removed
  const [removed] = result.splice(startIndex, 1)
  // placing removed into new postion
  result.splice(endIndex, 0, removed)
  return result
}
