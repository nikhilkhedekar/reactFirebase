const admin = require('firebase-admin');
const firebaseAdminConfig = require("./firebaseAdminConfig.json"); 

// admin.initializeApp();
admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminConfig)
});

const db = admin.firestore();

module.exports = { admin, db };