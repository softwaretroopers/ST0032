import firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBybQpyiwRKbgFmZRswjgD_jO0KyZRlYBc",
  authDomain: "post-696969.firebaseapp.com",
  databaseURL:
    "https://post-696969-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "post-696969",
  storageBucket: "post-696969.appspot.com",
  messagingSenderId: "281797157745",
  appId: "1:281797157745:web:8abed0f72f7da74e718cd0",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
