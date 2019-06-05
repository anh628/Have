import * as actionType from '../constants/constants'

const initialState = [
  {
    collectionId: '06befca2-1f9c-4a3d-8a79-bd43b979d75',
    editCollectionFlag: false
  },
  {
    collectionId: '5bec6846-865d-43ba-ad08-3fdd62fe9c80',
    editCollectionFlag: false
  },
  {
    collectionId: '6c2c2a8e-0711-463a-862b-9756847de31f',
    editCollectionFlag: false
  },
  {
    collectionId: 'c6f919eb-7627-4002-bb81-026132f88a81',
    editCollectionFlag: false
  }
]

const collection = (state = initialState, action) => {
  let collection
  switch (action.type) {
    case actionType.ADD_COLLECTION:
      collection = {
        collectionId: action.collectionId,
        editCollectionFlag: false
      }
      return [...state, collection]
    case actionType.EDIT_COLLECTION:
      collection = [...state]
      collection = collection.map(collection =>
        collection.collectionId === action.collectionId
          ? {
            ...collection,
            editCollectionFlag: !collection.editCollectionFlag
          }
          : collection
      )

      return collection
    default:
      return state
  }
}
export default collection
