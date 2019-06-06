import { usersCollectionRef, db } from './firebase'

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
  return `users/${uid}/itemCollections/${collectionId}`
}
const getItemRef = (uid, collectionId, itemId) => {
  return `users/${uid}/itemCollections/${collectionId}/items/${itemId}`
}

export const addCollection = (uid, collectionId, collectionColor) => {
  const collectionInfo = {
    title: null,
    collaborators: [],
    collectionColor,
    image: null
  }

  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  return itemCollectionRef // this will pick amongst collections that an individual user will have
    .set(collectionInfo) // will be the fields above
    .catch(error => console.log(error))
}

export const deleteCollection = (uid, collectionId) => {
  const collectionRef = getItemCollectionRef(uid, collectionId)
  return collectionRef.delete().catch(error => console.log(error))
}

export const editTitle = (uid, collectionId, title) => {
  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  return itemCollectionRef.update({ title }).catch(error => console.log(error))
}

export const deleteTitle = (uid, collectionId) => {
  return editTitle(uid, collectionId, null)
}

export const addItem = (uid, collectionId, itemId, text) => {
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

// TODO come back here later
export const deleteAllCompleted = (uid, collectionId) => {
  const batch = db.batch()

  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  itemCollectionRef
    .where('isComplete', '==', true)
    .get()
    .then(completedItems => {
      completedItems.forEach(item => {
        const itemRef = itemCollectionRef.doc(item.itemId)
        batch.delete(itemRef)
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
export const setAllItemsCompleteness = (
  uid,
  collectionId,
  listCompleteness
) => {
  const itemCollectionRef = getItemCollectionRef(uid, collectionId)

  db.runTransaction(transaction => {
    return transaction
      .get(itemCollectionRef)
      .then(items => {
        items.forEach(item =>
          itemCollectionRef
            .doc(item.id)
            .update({ isComplete: !listCompleteness })
        )
      })
      .catch(error => console.log(error))
  })
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
