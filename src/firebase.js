// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA90ORI9kli-rAYqusr71oVPTFISHiC5bs",
  authDomain: "jstmeet.firebaseapp.com",
  projectId: "jstmeet",
  storageBucket: "jstmeet.appspot.com",
  messagingSenderId: "601587102023",
  appId: "1:601587102023:web:7a94c66edef2408b355c62"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
