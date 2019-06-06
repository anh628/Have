import * as actionType from '../constants/constants'

export const _addCollection = collectionId => ({
  type: actionType.ADD_COLLECTION,
  collectionId
})

export const deleteCollection = (uid, collectionId) => ({
  type: actionType.DELETE_COLLECTION,
  uid,
  collectionId
})

// export const addTitle = (uid, collectionId, title) => ({
//     type: actionType.ADD_TITLE,
//     uid,
//     collectionId,
//     title
// })

export const editTitle = (uid, collectionId, title) => ({
  type: actionType.EDIT_TITLE,
  uid,
  collectionId,
  title
})

export const deleteTitle = (uid, collectionId) => ({
  type: actionType.DELETE_TITLE,
  uid,
  collectionId
})

export const addItem = (uid, collectionId, itemId, text) => ({
  type: actionType.ADD_ITEM,
  uid,
  collectionId,
  itemId,
  text
})

export const editItem = (uid, collectionId, itemId, editedText) => ({
  type: actionType.EDIT_ITEM,
  uid,
  collectionId,
  itemId,
  editedText
})

export const deleteItem = (uid, collectionId, itemId) => ({
  type: actionType.DELETE_ITEM,
  uid,
  collectionId,
  itemId
})

export const deleteAllCompleted = (uid, collectionId) => ({
  type: actionType.DELETE_ALL_COMPLETED,
  uid,
  collectionId
})

// export const addImage = (uid, collectionId, image) => ({
//   type: actionType.ADD_IMAGE,
//   uid,
//   collectionId,
//   image
// });

export const editImage = (uid, collectionId, editedImage) => ({
  type: actionType.EDIT_IMAGE,
  uid,
  collectionId,
  editedImage
})

export const deleteImage = (uid, collectionId) => ({
  type: actionType.DELETE_IMAGE,
  uid,
  collectionId
})

export const toggleItem = (uid, collectionId, itemId) => ({
  type: actionType.TOGGLE_ITEM,
  uid,
  collectionId,
  itemId
})

export const toggleAllItems = (uid, collectionId) => ({
  type: actionType.TOGGLE_ALL_ITEMS,
  uid,
  collectionId
})

export const addColor = (uid, collectionId, collectionColor) => ({
  type: actionType.ADD_COLOR,
  uid,
  collectionId,
  collectionColor
})

export const editColor = (uid, collectionId, collectionColor) => ({
  type: actionType.EDIT_COLOR,
  uid,
  collectionId,
  collectionColor
})

export const addCollaborator = (uid, collectionId, collabUID) => ({
  type: actionType.ADD_COLLABORATOR,
  uid,
  collectionId,
  collabUID
})

export const removeCollaborator = (uid, collectionId, collabUID) => ({
  type: actionType.REMOVE_COLLABORATOR,
  uid,
  collectionId,
  collabUID
})

export const logIn = uid => ({
  type: actionType.LOG_IN,
  uid
})

export const logOut = uid => ({
  type: actionType.LOG_OUT,
  uid
})

// redux

export const changeEditFlag = item => ({
  type: actionType.EDIT_ITEM_FLAG,
  item
})

export const changeEditCollectionFlag = collectionId => ({
  type: actionType.EDIT_COLLECTION,
  collectionId
})
