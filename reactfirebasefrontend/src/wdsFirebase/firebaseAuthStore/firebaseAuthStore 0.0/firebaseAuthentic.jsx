import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';

// login credentials : fintrainee02@gmail.com - 123456789

export const FirebaseApp = initializeApp({
  apiKey: "AIzaSyBLnheoDuyZuOY7Muwb_-0h-HLJTnN17hg",
  authDomain: "wdsreactauth.firebaseapp.com",
  databaseURL: "https://wdsreactauth-default-rtdb.firebaseio.com",
  projectId: "wdsreactauth",
  storageBucket: "wdsreactauth.appspot.com",
  messagingSenderId: "10144809538",
  appId: "1:10144809538:web:387e205fc1c145742123db"
})

export const firebaseAuth = getAuth(FirebaseApp);
console.log("firebaseAuth", firebaseAuth);

export const fireStore = getFirestore(FirebaseApp);
console.log("fireStore", fireStore);

export const fireStorage = getStorage(FirebaseApp);
console.log("fireStorage", fireStorage);