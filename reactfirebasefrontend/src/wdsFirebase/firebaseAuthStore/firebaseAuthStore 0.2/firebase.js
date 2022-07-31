// import firebase from "firebase/app"
// import "firebase/auth"
// import "firebase/firestore"
// import "firebase/storage"

import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import { serverTimestamp } from 'firebase/firestore';

import {
    collection,
    getDocs,
    addDocs,
    updateDoc,
    deleteDoc,
    doc,

} from 'firebase/firestore';

const app = initializeApp({
    apiKey: "AIzaSyBLnheoDuyZuOY7Muwb_-0h-HLJTnN17hg",
    authDomain: "wdsreactauth.firebaseapp.com",
    databaseURL: "https://wdsreactauth-default-rtdb.firebaseio.com",
    projectId: "wdsreactauth",
    storageBucket: "wdsreactauth.appspot.com",
    messagingSenderId: "10144809538",
    appId: "1:10144809538:web:387e205fc1c145742123db"
})

const firestore = getFirestore(app);

export const database = {
    folders: collection(firestore, "folders"),
    files: collection(firestore, "files"),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    //getCurrentTimestamp: new Date().toISOString(),//firestore.Timestamp.fromDate(new Date())
}
export const storage = getStorage(app)
export const auth = getAuth(app)
export default app