export const catData = data => {
  return {
    picture: data.url,
    title: data.breeds[0] && data.breeds[0].id,
    description: data.breeds[0] && data.breeds[0].description,
    temperament: data.breeds[0] && data.breeds[0].temperament
  }
}
