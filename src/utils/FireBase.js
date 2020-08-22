import firebase from 'firebase/app';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCh_13n9_QiaxOTLFHQERq7KXBL_VmnBvU",
  authDomain: "chat-application-11f56.firebaseapp.com",
  databaseURL: "https://chat-application-11f56.firebaseio.com",
  projectId: "chat-application-11f56",
  storageBucket: "chat-application-11f56.appspot.com",
  messagingSenderId: "225465640635",
  appId: "1:225465640635:web:9aab085f0cbf0ba1b0eb9e",
  measurementId: "G-0HTCJVT85M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const storage = firebase.storage();
export { storage, firebase as default };
