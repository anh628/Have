import * as actionType from '../constants/constants'

const collection = (state = [], action) => {
  let collection
  switch (action.type) {
    case actionType.ADD_COLLECTION:
      collection = {
        collectionId: action.collectionId,
        editCollectionFlag: true
      }
      return [...state, collection]
    case actionType.EDIT_COLLECTION:
      return state.map(collection =>
        collection.collectionId === action.collectionId
          ? {
            ...collection,
            editCollectionFlag: !collection.editCollectionFlag
          }
          : collection
      )
    default:
      return state
  }
}
export default collection
