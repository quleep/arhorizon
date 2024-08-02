// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQo2dhiBeNTpK2_G-TRY9lv1ZPsiL_Q04",
  authDomain: "arhorizon-de3b0.firebaseapp.com",
  projectId: "arhorizon-de3b0",
  storageBucket: "arhorizon-de3b0.appspot.com",
  messagingSenderId: "579270822805",
  appId: "1:579270822805:web:e15f4efdc107393fbe849c",
  measurementId: "G-D6CKW5C9HJ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
