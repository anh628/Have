import * as actionType from '../constants/constants'

const dummyState = [
  {
    collectionId: 'p2274cBhsPDkM6GhlBJc',
    editCollectionFlag: false
  }
]
const collection = (state = dummyState, action) => {
  let collection
  switch (action.type) {
    case actionType.ADD_COLLECTION:
      collection = {
        collectionId: action.collectionId,
        editCollectionFlag: true // starts out true because you will be editing the collection when adding a new collection
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
    case actionType.DELETE_COLLECTION:
      return state.filter(
        collection => collection.collectedId !== action.collectionId
      )
    default:
      return state
  }
}
export default collection
