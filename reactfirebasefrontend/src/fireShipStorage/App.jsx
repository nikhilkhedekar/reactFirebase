import React from 'react'
import { firestore } from './config'

const App = () => {
    console.log("fireStore", firestore)
    const folders = firestore.collection("folders").doc("folder1");
    console.log("folders", folders);
    return(
        <div>
            Hello
        </div>
    )
}

export default App

// const app = initializeApp({
//     apiKey: process.localFirebase.API_KEY,
//     authDomain: process.localFirebase.AUTH_DOMAIN,
//     databaseURL: process.localFirebase.DATABASE_URL,
//     projectId: process.localFirebase.PROJECT_ID,
//     storageBucket: process.localFirebase.STORAGE_BUCKET,
//     messagingSenderId: process.localFirebase.MESSAGING_SENDER_ID,
//     appId: process.localFirebase.APP_ID,
// })