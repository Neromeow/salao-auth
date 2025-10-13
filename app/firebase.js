// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy0QV1RUpBXqs8U8Gd776g-D6aSJmiQbY",
  authDomain: "salao-auth.firebaseapp.com",
  projectId: "salao-auth",
  storageBucket: "salao-auth.firebasestorage.app",
  messagingSenderId: "774429192005",
  appId: "1:774429192005:web:0075a54da39dfeb5d8d82c",
  measurementId: "G-HQPM3JEV9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);