// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-educode.firebaseapp.com",
  projectId: "mern-educode",
  storageBucket: "mern-educode.appspot.com",
  messagingSenderId: "1094740281607",
  appId: "1:1094740281607:web:54a32b8d468b3b29e4dda2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);