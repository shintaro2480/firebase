// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA90ORI9kli-rAYqusr71oVPTFISHiC5bs",
  authDomain: "jstmeet.firebaseapp.com",
  projectId: "jstmeet",
  storageBucket: "jstmeet.appspot.com",
  messagingSenderId: "601587102023",
  appId: "1:601587102023:web:7a94c66edef2408b355c62",
  databaseURL: "https://jstmeet-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// 必要なサービスをエクスポート
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };