/* eslint-disable no-console */
import { usersCollectionRef, db } from './firebase'
import { v4 } from 'node-uuid'
import { _addCollection, _deleteCollection } from '../actions/actionCreators'
/*
db = firebase.firestore();
usersCollectionRef = db.collection("users");

userRef = usersRef.doc(uid);

user field => userInformation

itemCollectionsRef = usersRef.doc(uid).collection("itemCollections").doc(collectionUID)

itemCollections field => color, collaborators...

itemRef = itemCollections.collection("item").doc(itemID)

item field => text, isComplete...
*/

const getItemCollectionRef = (uid, collectionId) => {
  return usersCollectionRef.doc(`${uid}/itemCollections/${collectionId}`)
}
const getItemRef = (uid, collectionId, itemId) => {
  return usersCollectionRef.doc(
    `${uid}/itemCollections/${collectionId}/items/${itemId}`
  )
}

export const addCollection = (uid, collectionColor) => dispatch => {
  let collectionId = v4()
  const collectionInfo = {
    title: null,
    collaborators: [],
    collectionColor: '#282c34',
    image: null
  }

  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  return itemCollectionRef
    .set(collectionInfo) // will be the fields above
    .catch(error => console.log(error))
    .then(() => dispatch(_addCollection(collectionId)))
}

/*
TODO: get dispatch to work
*/
export const deleteCollection = (uid, collectionId) => dispatch => {
  const collectionRef = getItemCollectionRef(uid, collectionId)
  return collectionRef.delete().catch(error => console.log(error))
  // .then(() => dispatch(_deleteCollection(collectionId)))
}

export const editTitle = (uid, collectionId, title) => {
  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  return itemCollectionRef.update({ title }).catch(error => console.log(error))
}

export const deleteTitle = (uid, collectionId) => {
  return editTitle(uid, collectionId, null)
}

export const addItem = (uid, collectionId, text) => {
  let itemId = v4()
  const itemInfo = {
    itemId,
    text,
    isComplete: false
  }

  const itemRef = getItemRef(uid, collectionId, itemId)

  return itemRef.set(itemInfo).catch(error => console.log(error))
}

export const editItem = (uid, collectionId, itemId, editedText) => {
  const itemRef = getItemRef(uid, collectionId, itemId)

  return itemRef.update({ text: editedText }).catch(error => console.log(error))
}

// IF we want trash/archive we will need to edit this
export const deleteItem = (uid, collectionId, itemId) => {
  const itemRef = getItemRef(uid, collectionId, itemId)

  return itemRef.delete().catch(error => console.log(error))
}

// Deletes all completed items in an item collection
export const deleteAllCompleted = (uid, collectionId) => {
  const batch = db.batch()

  const itemCollectionRef = getItemCollectionRef(uid, collectionId).collection(
    'items'
  )

  itemCollectionRef
    .where('isComplete', '==', true)
    .get()
    .then(completedItems => {
      completedItems.forEach(item => {
        batch.delete(item.ref)
      })
      return batch.commit()
    })
}

// don't have an add image because we are really just editing the default value we already set for image
export const editImage = (uid, collectionId, image) => {
  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  return itemCollectionRef.update({ image }).catch(error => console.log(error))
}

// if we want to have more than one image we need to adjust this and the one above
export const deleteImage = (uid, collectionId) => {
  return editImage(uid, collectionId, null)
}

export const toggleItem = (uid, collectionId, itemId) => {
  const itemRef = getItemRef(uid, collectionId, itemId)

  return itemRef
    .update({ isComplete: !itemRef.data().isComplete })
    .catch(error => console.log(error))
}

// renamed from toggleAllItems to setAllItemsCompleteness
// listCompleteness, boolean, what you want the isComplete to be
export const setAllItemsCompleteness = (
  uid,
  collectionId,
  listCompleteness
) => {
  const itemCollectionRef = getItemCollectionRef(uid, collectionId).collection(
    'items'
  )

  const batch = db.batch()

  // perform query to get documents where the isComplete is opposite of listCompleteness
  return itemCollectionRef
    .where('isComplete', '==', !listCompleteness)
    .get()
    .then(items => {
      items.forEach(item => {
        batch.update(item.ref, { isComplete: listCompleteness })
      })
      return batch.commit()
    })
    .catch(error => console.log(error))
}

// add and edit color are basically the same thing since we already have a default set to null
export const editColor = (uid, collectionId, collectionColor) => {
  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  return itemCollectionRef
    .update({ collectionColor })
    .catch(error => console.log(error))
}
/*
export const addCollaborator = (uid, collectionId, collabUID) => {
  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  const collaborators = itemCollectionRef.doc().collaborators
  collaborators.push(collabUID)

  return itemCollectionRef
    .update({ collaborators })
    .catch(error => console.log(error))
}

export const removeCollaborator = (uid, collectionId, collabUID) => {
  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  const collaborators = itemCollectionRef
    .doc()
    .collaborators.filter(id => id !== collabUID)
  return itemCollectionRef
    .update({ collaborators })
    .catch(error => console.log(error))
}
*/
