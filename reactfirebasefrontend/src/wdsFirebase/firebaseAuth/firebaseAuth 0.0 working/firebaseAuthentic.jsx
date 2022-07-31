import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

export const FirebaseApp = initializeApp ({
  apiKey: "AIzaSyBLnheoDuyZuOY7Muwb_-0h-HLJTnN17hg",
  authDomain: "wdsreactauth.firebaseapp.com",
  databaseURL: "https://wdsreactauth-default-rtdb.firebaseio.com",
  projectId: "wdsreactauth",
  storageBucket: "wdsreactauth.appspot.com",
  messagingSenderId: "10144809538",
  appId: "1:10144809538:web:387e205fc1c145742123db"
})

export const firebaseAuth = getAuth(FirebaseApp);

