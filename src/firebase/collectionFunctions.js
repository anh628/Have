import { usersCollectionRef, db } from './firebase'
import { v4 } from 'node-uuid'
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

export const addCollection = (uid, collectionColor) => {
  let collectionId = v4()
  const collectionInfo = {
    title: null,
    collaborators: [],
    collectionColor,
    image: null
  }
  return usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections') // collection of items for a given user
    .doc(`${collectionId}`) // this will pick amongst collections that an individual user will have
    .set(collectionInfo) // will be the fields above
    .catch(error => console.log(error))
}

export const deleteCollection = (uid, collectionId) => {
  return usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)
    .delete()
    .catch(error => console.log(error))
}

export const editTitle = (uid, collectionId, title) => {
  const itemCollectionRef = usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)

  return itemCollectionRef
    .get()
    .then(() => itemCollectionRef.update({ title }))
    .catch(error => console.log(error))
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
  return usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)
    .collection('items') // the items within a user's collection
    .doc(`${itemId}`) // the ID of the item you want to add
    .set(itemInfo) // see above
    .catch(error => console.log(error))
}

export const editItem = (uid, collectionId, itemId, editedText) => {
  const itemRef = usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)
    .collection('items')
    .doc(`${itemId}`)

  return itemRef
    .get()
    .then(() => itemRef.update({ text: editedText }))
    .catch(error => console.log(error))
}

// IF we want trash/archive we will need to edit this
export const deleteItem = (uid, collectionId, itemId) => {
  return usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)
    .collection('items')
    .doc(`${itemId}`)
    .delete()
    .catch(error => console.log(error))
}

  return itemRef.delete().catch(error => console.log(error))
}

// Deletes all completed items in an item collection
export const deleteAllCompleted = (uid, collectionId) => {
  const batch = db.batch()

  const currentCollectionRef = usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)
    .collection('items')

  currentCollectionRef
    .where('isComplete', '==', true)
    .get()
    .then(completedItems => {
      completedItems.forEach(item => {
        const itemRef = currentCollectionRef.doc(item.itemId)
        batch.delete(itemRef)
      })
      return batch.commit()
    })
}

// don't have an add image because we are really just editing the default value we already set for image
export const editImage = (uid, collectionId, image) => {
  const itemCollectionRef = usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)

  return itemCollectionRef
    .get()
    .then(() => itemCollectionRef.update({ image }))
    .catch(error => console.log(error))
}

// if we want to have more than one image we need to adjust this and the one above
export const deleteImage = (uid, collectionId) => {
  return editImage(uid, collectionId, null)
}

export const toggleItem = (uid, collectionId, itemId) => {
  const itemRef = usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)
    .collection('items')
    .doc(`${itemId}`)

  return itemRef
    .update({ isComplete: !itemRef.data().isComplete })
    .catch(error => console.log(error))
}

// renamed from toggleAllItems to setAllItemsCompleteness
// if listCompleteness === true, then set all to false, otherwise set all to true
export const setAllItemsCompleteness = (
  uid,
  collectionId,
  listCompleteness
) => {
  const itemCollectionRef = getItemCollectionRef(uid, collectionId).collection(
    'items'
  )

  const batch = db.batch()

  const isComplete = !listCompleteness

  // not sure if this is correct
  itemCollectionRef
    .get()
    .then(item => itemRef.update({ isComplete: !item.data().isComplete }))
    .catch(error => console.log(error))
}

export const toggleAllItems = (uid, collectionId, listCompleteness) => {
  const currentCollectionRef = usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)
    .collection('items')

  currentCollectionRef.get().then(querySnapshot => {
    querySnapshot.forEach(item =>
      currentCollectionRef
        .doc(item.id)
        .update({ isComplete: !listCompleteness })
    )
  })
}

// add and edit color are basically the same thing since we already have a default set to null
export const editColor = (uid, collectionId, collectionColor) => {
  const itemCollectionRef = usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)

  return itemCollectionRef
    .get()
    .then(() => itemCollectionRef.update({ collectionColor }))
    .catch(error => console.log(error))
}

export const addCollaborator = (uid, collectionId, collabUID) => {
  const itemCollectionRef = usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)

  const collaborators = itemCollectionRef.doc().collaborators
  collaborators.push(collabUID)

  return itemCollectionRef
    .get()
    .then(() => itemCollectionRef.update({ collaborators }))
    .catch(error => console.log(error))
}

export const removeCollaborator = (uid, collectionId, collabUID) => {
  const itemCollectionRef = usersCollectionRef
    .doc(`${uid}`)
    .collection('itemCollections')
    .doc(`${collectionId}`)

  const collaborators = itemCollectionRef
    .doc()
    .collaborators.filter(id => id !== collabUID)
  return itemCollectionRef
    .get()
    .then(() => itemCollectionRef.update({ collaborators }))
    .catch(error => console.log(error))
}
