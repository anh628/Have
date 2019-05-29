import { usersCollectionRef } from "./firebase";

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

export const addCollection = (uid, collectionId, collectionColor) => {
  const collectionInfo = {
    title: null,
    collaborators: [],
    collectionColor
  };
  return usersCollectionRef
    .doc(`${uid}`)
    .collection("itemCollections")
    .doc(`${collectionId}`)
    .set(collectionInfo)
    .catch(error => console.log(error));
};

export const deleteCollection = (uid, collectionId) => {
  return usersCollectionRef
    .doc(`${uid}`)
    .collection("itemCollections")
    .doc(`${collectionId}`)
    .delete()
    .catch(error => console.log(error));
};

export const editTitle = (uid, collectionId, title) => {
  const itemCollectionRef = usersCollectionRef
    .doc(`${uid}`)
    .collection("itemCollections")
    .doc(`${collectionId}`);

  return itemCollectionRef
    .get()
    .then(() => itemCollectionRef.update({ title }))
    .catch(error => console.log(error));
};

export const deleteTitle = (uid, collectionId) => {
  return editTitle(uid, collectionId, null);
};

export const addItem = (uid, collectionId, itemId, text) => {
  const itemInfo = {
    itemId,
    text,
    isComplete: false
  };
  return usersCollectionRef
    .doc(`${uid}`)
    .collection("itemCollections")
    .doc(`${collectionId}`)
    .collection("item")
    .doc(`${itemId}`)
    .set(itemInfo)
    .catch(error => console.log(error));
};

export const editItem = (uid, collectionId, itemId, editedText) => {
  const itemRef = usersCollectionRef
    .doc(`${uid}`)
    .collection("itemCollections")
    .doc(`${collectionId}`)
    .collection("item")
    .doc(`${itemId}`);

  return itemRef
    .get()
    .then(() => itemRef.update({ text: editedText }))
    .catch(error => console.log(error));
};

export const deleteItem = (uid, collectionId, itemId) => {
  return usersCollectionRef
    .doc(`${uid}`)
    .collection("itemCollections")
    .doc(`${collectionId}`)
    .collection("item")
    .doc(`${itemId}`)
    .delete()
    .catch(error => console.log(error));
};

export const deleteAllCompleted = (uid, collectionId) => {};
