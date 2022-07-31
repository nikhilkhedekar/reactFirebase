//https://www.youtube.com/watch?v=T8SZv6h2WbY

//firebase -> docs -> build -> cloud functions -> side menu -> cloud functions -> config your environment ->
// -> Set environment configuration with the CLI -> 

//firebase functions:config:
//set private.key="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDpJp6vPbYxC6iS\nw2CMNfd7mywdrlLGFFTsruH6Qk5PAfWM8mZCa0f9Z+P+8OFQ/nnBOGWfN9/ZtgH2\nprCxll0ydSsd4kyMqV2PgUu3vves2CIimppF8gmUU3WGuBZRVPvumlOWPIM3MGRb\nz80lJqNc0jdPl0OZOaGbbD88ZCvu5+m/wVgqJF+2SEGIsQW3xs2nA7mGg/ulQuCN\nXfjPAF3FnXjlmPT12Gm5uVzxmuybbuqe7nfWJz4RW6j37+Ln1OGAHfpx8GhIZo8P\n5SkWdW92yGESMZhdNYy+7wOYly+iA7oQg+bAMfph9BgkhH3asHckkdiWsFb5pQff\neotmDD5/AgMBAAECggEAQYrdTic7igMcgxGQmSnsph9jof5o/40kqJqrJTaxm+1R\nkattCtvs03R6uCcQODwpjyNjEgTblXDgkW2fu3SpQ2+DzPVajqpoBlkTJ5b0Om9R\n/UdX+jTF86AYqGQkxf1ti1BwEgp12rRsahD7OyfnAceIzAOaeb8lSrN9/WStow2e\noL6DYA3Fp55507IvCSDBz0nLmlsD9eoVPlgZ/agKf4jNpcHSHWtBi9t+KBQvfBsv\nKXAUXfRikRAV8YSf/sEo5DwtcnEcZJbRjC6LXUkU4t+D5D7cT4nooVflJuRNgwFj\nuqlexRnbJjnFTiO1PSl41UCCD6YXAq7CT2dV3YJ/YQKBgQD07XJ+5La38a1CjHaQ\nCV1F71sDQiMgAZMvkGMRPq2BmRT5UTzOBnfT5vL/gbeik8c9kDWt736mpFdK9biJ\n3lrroiXTgdykkdi+THn8TZ9kM5V/OKpc79W/f7db3VodoC+F3WldyfJQHpe68jEk\neM8Dhlch4iLtNqzL5LPWRJZTYQKBgQDzsOGDDMoAJommBKtrFPEJttg+CvtwUe7G\nGJ637x3wCw4kCx3XJRrxR9XSxJiEiDDqh1KcwTUNRADC5N5Oem+iWdExsOwaSPOu\nFKf+d4dNzP4qr2wIBBt7sSM8cuLpe/L4xpKz1hRO69emTtTjxjyMnNQAk9Ot72Ha\nQHAxEmu93wKBgGD4XZtlu/3JvnoZmJtgScB1iogYuEVkujxbow1hzloAHLC0/Cjp\noKmRx2VnmyfP8FMsdERADNm3OSRhcsWK9l5SXT2HLa8uWyzEpItCxDdswOSUr8aJ\n4gumahcB5TrTf901ExFh8gDMi/AlEVXKStOvbXHp0UAvpGw5SQYtM4MhAoGBANdI\nVyF4JehWI1p4W5uhB4QmdQjymMjUiRWWYHlsFE2g5qAu9fDARfoMFTk7FuZWjqhS\nXkg/Y4fRoL6MhFxeS8rogCfe/eYGtsf+VZ83p1+zDoNVMCIwxrrSdaeMcywDpVXj\nz2xyXsSOE5hHokmLMqiiT6Qm9GV/yjmOnc6sUGSPAoGBAK3k8oh89yVXbfTGPTm3\nHqnl0QpPZSxYCcaAUYVJqpmWhfI0NgaMmFqZJ9lTKVjGr1Mxa5tYEhVY8GEjq1Ge\nX0CCXzOspboMKm1jPlfQaXQaaJkH7FmZ1EobJg4cCLsV1ClnoDskY3ggvxVwRZ0t\nCe8a64vjfgROvxZS57KLoV0w\n-----END PRIVATE KEY-----\n" 
//project.id="fir-cloudfunc-624b1"
//client.email: "firebase-adminsdk-zpq7z@fir-cloudfunc-624b1.iam.gserviceaccount.com"

//==================================================================

//goto project settings -> project settings -> sevice acc -> generate key
// var admin = require("firebase-admin");

// admin.initializeApp({
//   credential: admin.credential.cert({
//     privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
//     projectId: functions.config().project.id,
//     clientEmail: functions.config().client.email,
//   }),
//   databaseUrl: "https://firebaseCloudFunc.firebaseio.com",
// });

//============================================================


const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./fbAuth');
const cors = require('cors');
const { db } = require('./admin');
const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream
} = require('./screams');
const { database } = require('firebase-functions/v1/firestore');
const {
  signup,
  login,
  uploadImage,
  // addUserDetails,
  // getAuthenticatedUser,
  // getUserDetails,
  // markNotificationsRead
} = require('./users');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

// Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', 
// FBAuth, 
postOneScream);
// app.get('/scream/:screamId', getScream);
// app.delete('/scream/:screamId', FBAuth, deleteScream);
// app.get('/scream/:screamId/like', FBAuth, likeScream);
// app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
// app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', 
// FBAuth, 
uploadImage);
// app.post('/user', FBAuth, addUserDetails);
// app.get('/user', FBAuth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);
// app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.region('us-central1').https.onRequest(app);

// exports.createNotificationOnLike = functions
//   .region('us-central1')
//   .firestore.document('likes/{id}')
//   .onCreate((snapshot) => {
//     return db
//       .doc(`/screams/${snapshot.data().screamId}`)
//       .get()
//       .then((doc) => {
//         if (
//           doc.exists &&
//           doc.data().userHandle !== snapshot.data().userHandle
//         ) {
//           return db.doc(`/notifications/${snapshot.id}`).set({
//             createdAt: new Date().toISOString(),
//             recipient: doc.data().userHandle,
//             sender: snapshot.data().userHandle,
//             type: 'like',
//             read: false,
//             screamId: doc.id
//           });
//         }
//       })
//       .catch((err) => console.error(err));
//   });
// exports.deleteNotificationOnUnLike = functions
//   .region('us-central1')
//   .firestore.document('likes/{id}')
//   .onDelete((snapshot) => {
//     return db
//       .doc(`/notifications/${snapshot.id}`)
//       .delete()
//       .catch((err) => {
//         console.error(err);
//         return;
//       });
//   });
// exports.createNotificationOnComment = functions
//   .region('us-central1')
//   .firestore.document('comments/{id}')
//   .onCreate((snapshot) => {
//     return db
//       .doc(`/screams/${snapshot.data().screamId}`)
//       .get()
//       .then((doc) => {
//         if (
//           doc.exists &&
//           doc.data().userHandle !== snapshot.data().userHandle
//         ) {
//           return db.doc(`/notifications/${snapshot.id}`).set({
//             createdAt: new Date().toISOString(),
//             recipient: doc.data().userHandle,
//             sender: snapshot.data().userHandle,
//             type: 'comment',
//             read: false,
//             screamId: doc.id
//           });
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         return;
//       });
//   });

// exports.onUserImageChange = functions
//   .region('us-central1')
//   .firestore.document('/users/{userId}')
//   .onUpdate((change) => {
//     console.log(change.before.data());
//     console.log(change.after.data());
//     if (change.before.data().imageUrl !== change.after.data().imageUrl) {
//       console.log('image has changed');
//       const batch = db.batch();
//       return db
//         .collection('screams')
//         .where('userHandle', '==', change.before.data().handle)
//         .get()
//         .then((data) => {
//           data.forEach((doc) => {
//             const scream = db.doc(`/screams/${doc.id}`);
//             batch.update(scream, { userImage: change.after.data().imageUrl });
//           });
//           return batch.commit();
//         });
//     } else return true;
//   });

// exports.onScreamDelete = functions
//   .region('us-central1')
//   .firestore.document('/screams/{screamId}')
//   .onDelete((snapshot, context) => {
//     const screamId = context.params.screamId;
//     const batch = db.batch();
//     return db
//       .collection('comments')
//       .where('screamId', '==', screamId)
//       .get()
//       .then((data) => {
//         data.forEach((doc) => {
//           batch.delete(db.doc(`/comments/${doc.id}`));
//         });
//         return db
//           .collection('likes')
//           .where('screamId', '==', screamId)
//           .get();
//       })
//       .then((data) => {
//         data.forEach((doc) => {
//           batch.delete(db.doc(`/likes/${doc.id}`));
//         });
//         return db
//           .collection('notifications')
//           .where('screamId', '==', screamId)
//           .get();
//       })
//       .then((data) => {
//         data.forEach((doc) => {
//           batch.delete(db.doc(`/notifications/${doc.id}`));
//         });
//         return batch.commit();
//       })
//       .catch((err) => console.error(err));
//   });
