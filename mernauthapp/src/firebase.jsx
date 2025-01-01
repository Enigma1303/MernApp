// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-5e748.firebaseapp.com",
  projectId: "auth-5e748",
  storageBucket: "auth-5e748.firebasestorage.app",
  messagingSenderId: "559674786192",
  appId: "1:559674786192:web:48f3ce5bfba59e65c2f315",
  measurementId: "G-C92T63JMEG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
