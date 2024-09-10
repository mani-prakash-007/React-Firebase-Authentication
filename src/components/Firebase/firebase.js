// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5H36wqLxposUz2dszmQkxiyKFSDqD9c4",
  authDomain: "login-authentication-b3ac5.firebaseapp.com",
  projectId: "login-authentication-b3ac5",
  storageBucket: "login-authentication-b3ac5.appspot.com",
  messagingSenderId: "1093279603981",
  appId: "1:1093279603981:web:466ee8e0707c9848a82444",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Auth
export const auth = getAuth();

//Firestore Database
export const database = getFirestore(app);

//Default Export
export default app;
