const express = require("express");

const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const app = express();

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

app.get("/getScreams", (req, res) => {
    let renderData = [];
    admin.firestore().collection("screams").get()
    .then(data => {
        data.forEach(doc => {
            renderData.push(doc.data());
        })
        return res.json(renderData);
    }).catch(error => console.log(error));    
});

app.post("/postScreams", (req, res) => {
    const newScream = {
        userHandle: req.body.userHandle,
        body: req.body.body,
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    }
    admin.firestore().collection("screams").add(newScream)
    .then(doc => {
        res.status(201).json({
            message: "scream posted successfully", 
        });
    })
    .catch(error => {
        console.log("error", error);
    })
})

exports.api = functions.https.onRequest(app);