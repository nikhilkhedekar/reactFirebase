const { admin, db } = require("./admin");
const { uuid } = require("uuidv4");
// const firebase = require("firebase");
const { initializeApp } = require("firebase/app");
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('@firebase/firestore');
// const { getStorage } = require('firebase-admin/storage');
const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // signOut, 
    onAuthStateChanged,
    // sendPasswordResetEmail,
    // updatePassword,
    // updateEmail
} = require('@firebase/auth');
const {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    where,
    onSnapshot,
} = require('firebase/firestore');
const { v4 } = require("uuid");
const {
    ref,
    getStorage,
    uploadBytesResumable,
    getDownloadURL
} = require('firebase/storage');

const { update } = require("firebase/database");

const {
    validateSignupData,
    // validateLoginData,
    // reduceUserDetails,
} = require("./validators");

const config = {
    apiKey: "AIzaSyDO8hlOmz0pngzmC0fEVVEscz1dGTQfG2o",
    authDomain: "fir-cloudfunc-624b1.firebaseapp.com",
    projectId: "fir-cloudfunc-624b1",
    storageBucket: "fir-cloudfunc-624b1.appspot.com",
    messagingSenderId: "475063610523",
    appId: "1:475063610523:web:c124f87f36276c9fa0ea3e"
};

let firebaseApp = initializeApp(config);
let firebaseAuth = getAuth(firebaseApp);
let firestore = getFirestore(firebaseApp);
let users = collection(firestore, "users");
let storage = getStorage(firebaseApp)
let user = null;

// Sign users up
exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    // const { valid, errors } = validateSignupData(newUser);

    // if (!valid) return res.status(400).json(errors);

    const noImg = "no-img.png";

    let token, userId;

    try {
        const userCreated = createUserWithEmailAndPassword(firebaseAuth, newUser.email, newUser.password);
        res.json({
            message: "User Created Successfully",
            data: {...newUser}
        })
        console.log("userCreatd", )        
        if (userCreated) {
            addDoc(users, {
                // handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                //TODO Append token to imageUrl. Work around just add token from image in storage.
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                userId: uuid(),
            })
        }
    } catch (error) {
        alert({
            code: error.code,
            message: error.message
        })
    }
    // db.doc(`/users/${newUser.handle}`)
    //     .get()
    //     .then((doc) => {
    //         if (doc.exists) {
    //             return res.status(400).json({ handle: "this handle is already taken" });
    //         } else {
    //             return firebase
    //                 .auth()
    //                 .createUserWithEmailAndPassword(newUser.email, newUser.password);
    //         }
    //     })
    //     .then((data) => {
    //         userId = data.user.uid;
    //         return data.user.getIdToken();
    //     })
    //     .then((idToken) => {
    //         token = idToken;
    //         const userCredentials = {
    //             handle: newUser.handle,
    //             email: newUser.email,
    //             createdAt: new Date().toISOString(),
    //             //TODO Append token to imageUrl. Work around just add token from image in storage.
    //             // imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
    //             userId,
    //         };
    //         return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    //     })
    //     .then(() => {
    //         return res.status(201).json({ token });
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //         if (err.code === "auth/email-already-in-use") {
    //             return res.status(400).json({ email: "Email is already is use" });
    //         } else {
    //             return res
    //                 .status(500)
    //                 .json({ general: "Something went wrong, please try again" });
    //         }
    //     });
};
// Log user in
exports.login = (req, res) => {
    let loading = false;
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    //   const { valid, errors } = validateLoginData(user);

    //   if (!valid) return res.status(400).json(errors);

    try {
        loading = true;
        const userSignedIn = signInWithEmailAndPassword(firebaseAuth, user.email, user.password);
        res.json({
            message: "User SignedIn Successfully",
            data: { ...userSignedIn },
        })

        onAuthStateChanged(firebaseAuth, user => {
            user = user;
            console.log("signedInUser", user);
        });
        loading = false;
    } catch (error) {
        alert({
            code: error.code,
            message: error.message
        })
    }

    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(user.email, user.password)
    //     .then((data) => {
    //       return data.user.getIdToken();
    //     })
    //     .then((token) => {
    //       return res.json({ token });
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       // auth/wrong-password
    //       // auth/user-not-user
    //       return res
    //         .status(403)
    //         .json({ general: "Wrong credentials, please try again" });
    //     });
};

// Add user details
// exports.addUserDetails = (req, res) => {
//   let userDetails = reduceUserDetails(req.body);

//   db.doc(`/users/${req.user.handle}`)
//     .update(userDetails)
//     .then(() => {
//       return res.json({ message: "Details added successfully" });
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
// // Get any user's details
// exports.getUserDetails = (req, res) => {
//   let userData = {};
//   db.doc(`/users/${req.params.handle}`)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         userData.user = doc.data();
//         return db
//           .collection("screams")
//           .where("userHandle", "==", req.params.handle)
//           .orderBy("createdAt", "desc")
//           .get();
//       } else {
//         return res.status(404).json({ errror: "User not found" });
//       }
//     })
//     .then((data) => {
//       userData.screams = [];
//       data.forEach((doc) => {
//         userData.screams.push({
//           body: doc.data().body,
//           createdAt: doc.data().createdAt,
//           userHandle: doc.data().userHandle,
//           userImage: doc.data().userImage,
//           likeCount: doc.data().likeCount,
//           commentCount: doc.data().commentCount,
//           screamId: doc.id,
//         });
//       });
//       return res.json(userData);
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
// Get own user details
// exports.getAuthenticatedUser = (req, res) => {
//   let userData = {};
//   db.doc(`/users/${req.user.handle}`)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         userData.credentials = doc.data();
//         return db
//           .collection("likes")
//           .where("userHandle", "==", req.user.handle)
//           .get();
//       }
//     })
//     .then((data) => {
//       userData.likes = [];
//       data.forEach((doc) => {
//         userData.likes.push(doc.data());
//       });
//       return db
//         .collection("notifications")
//         .where("recipient", "==", req.user.handle)
//         .orderBy("createdAt", "desc")
//         .limit(10)
//         .get();
//     })
//     .then((data) => {
//       userData.notifications = [];
//       data.forEach((doc) => {
//         userData.notifications.push({
//           recipient: doc.data().recipient,
//           sender: doc.data().sender,
//           createdAt: doc.data().createdAt,
//           screamId: doc.data().screamId,
//           type: doc.data().type,
//           read: doc.data().read,
//           notificationId: doc.id,
//         });
//       });
//       return res.json(userData);
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
// Upload a profile image for user
exports.uploadImage = (req, res) => {

    // need to work on file route and user auth

    const path = require("path");
    const os = require("os");
    const fs = require("fs");

    const mimeType = req.headers['content-type'];
    let fileExtension = mimeType.slice(6);
    let imageFileName = `${Math.random()}.${fileExtension}`;
    const filePath = path.join(os.tmpdir(),
          imageFileName
    );
    const id = v4()

    const storageRef = ref(storage, `${user.uid}/${filePath}`);
    const uploadTask = uploadBytesResumable(storageRef, req.body);

    uploadTask
      .on('state-changed', snapshot => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        console.log(progress);
      }, (error) => {
        console.log(error);
      });

    // const path = require("path");
    // const os = require("os");
    // const fs = require("fs");

    //   const mimeType = req.headers['content-type'];
    // let fileExtension = mimeType.slice(6);
    // let imageFileName = `${Math.random()}.${fileExtension}`;
    // const filePath = path.join(os.tmpdir(), imageFileName);
    // let imageToBeUploaded = {};    
    // let generatedToken = v4()
    // imageToBeUploaded = { filePath, mimeType };


    // admin
    //     .storage()
    //     .bucket()
    //     .upload(imageToBeUploaded.filepath, {
    //       resumable: false,
    //       metadata: {
    //         metadata: {
    //           contentType: imageToBeUploaded.mimetype,
    //           //Generate token to be appended to imageUrl
    //           firebaseStorageDownloadTokens: generatedToken,
    //         },
    //       },
    //     })
    //     .then(() => {
    //       // Append token to url
    //       //https://firebaseCloudFunc.firebaseio.com
    //       //firebase-functions/v1/firestore
    //       //____gs://fir-cloudfunc-624b1.appspot.com
    //       const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
    //       return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
    //     })
    //     .then(() => {
    //       return res.json({ message: "image uploaded successfully" });
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       return res.status(500).json({ error: "something went wrong" });
    //     });

    


    //   const BusBoy = require("busboy");
    //   const path = require("path");
    //   const os = require("os");
    //   const fs = require("fs");

    //   const busboy = BusBoy({ headers: req.headers });
      

    //   let imageToBeUploaded = {};
    //   let imageFileName;
    //   // String for image token
    //   let generatedToken = uuid();

    // busboy.on("file", (name, file, info) => {
    //   console.log(name, file, { filename, encoding, mimeType } = info);
    // //   if (mimeType !== "image/jpg" && mimeType !== "image/png") {
    // //     return res.status(400).json({ error: "Wrong file type submitted" });
    // //   }
    //   // my.image.png => ['my', 'image', 'png']
    //   const imageExtension = filename.split(".")[filename.split(".").length - 1];
    //   // 32756238461724837.png
    //   imageFileName = `${Math.round(
    //     Math.random() * 1000000000000
    //   ).toString()}.${imageExtension}`;
    //   const filepath = path.join(os.tmpdir(), imageFileName);
    //   imageToBeUploaded = { filepath, mimeType };
    //   file.pipe(fs.createWriteStream(filepath));
    // });
    // busboy.on("finish", () => {
    //   admin
    //     .storage()
    //     .bucket()
    //     .upload(imageToBeUploaded.filepath, {
    //       resumable: false,
    //       metadata: {
    //         metadata: {
    //           contentType: imageToBeUploaded.mimetype,
    //           //Generate token to be appended to imageUrl
    //           firebaseStorageDownloadTokens: generatedToken,
    //         },
    //       },
    //     })
    //     .then(() => {
    //       // Append token to url
    //       //https://firebaseCloudFunc.firebaseio.com
    //       //firebase-functions/v1/firestore
    //       //____gs://fir-cloudfunc-624b1.appspot.com
    //       const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
    //       return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
    //     })
    //     .then(() => {
    //       return res.json({ message: "image uploaded successfully" });
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       return res.status(500).json({ error: "something went wrong" });
    //     });
    // });
    // busboy.end(req.rawBody);
};

// exports.markNotificationsRead = (req, res) => {
//   let batch = db.batch();
//   req.body.forEach((notificationId) => {
//     const notification = db.doc(`/notifications/${notificationId}`);
//     batch.update(notification, { read: true });
//   });
//   batch
//     .commit()
//     .then(() => {
//       return res.json({ message: "Notifications marked read" });
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
