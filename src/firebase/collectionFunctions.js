import { usersCollectionRef, db } from "./firebase";

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
    .collection("itemCollections") //collection of items for a given user
    .doc(`${collectionId}`) //this will pick amongst collections that an individual user will have
    .set(collectionInfo) //will be the fields above
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
    .collection("items") //the items within a user's collection
    .doc(`${itemId}`) //the ID of the item you want to add
    .set(itemInfo) //see above
    .catch(error => console.log(error));
};

export const editItem = (uid, collectionId, itemId, editedText) => {
  const itemRef = usersCollectionRef
    .doc(`${uid}`)
    .collection("itemCollections")
    .doc(`${collectionId}`)
    .collection("items")
    .doc(`${itemId}`);

  return itemRef
    .get()
    .then(() => itemRef.update({ text: editedText }))
    .catch(error => console.log(error));
};

//IF we want trash/archive we will need to edit this 
export const deleteItem = (uid, collectionId, itemId) => {
  return usersCollectionRef
    .doc(`${uid}`)
    .collection("itemCollections")
    .doc(`${collectionId}`)
    .collection("items")
    .doc(`${itemId}`)
    .delete()
    .catch(error => console.log(error));
};

export const deleteAllCompleted = (uid, collectionId) => {
    const batch = db.batch();

    const currentCollectionRef = usersCollectionRef
    .doc(`${uid}`)
    .collection("itemCollections")
    .doc(`${collectionId}`)
    .collection("items");

    currentCollectionRef.where("isComplete", "==", true)
    .get()
    .then(completedItems => {
        completedItems.forEach(item => {
            const itemRef = currentCollectionRef.doc(item.itemId);
            batch.delete(itemRef)
        
    } return batch.commit()
})
     

};
