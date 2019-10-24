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

/**
 * Moves an item from one list to another list.
 */
export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source)
  const destinationClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destinationClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[0] = sourceClone
  result[1] = destinationClone

  return result
}
