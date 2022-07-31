import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBLnheoDuyZuOY7Muwb_-0h-HLJTnN17hg",
    authDomain: "wdsreactauth.firebaseapp.com",
    databaseURL: "https://wdsreactauth-default-rtdb.firebaseio.com",
    projectId: "wdsreactauth",
    storageBucket: "wdsreactauth.appspot.com",
    messagingSenderId: "10144809538",
    appId: "1:10144809538:web:387e205fc1c145742123db"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);