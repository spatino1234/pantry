// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAPEAEeUv0o-RZyW2wEMMzNPLmpab2RJE",
  authDomain: "pantry-tracker-demo.firebaseapp.com",
  projectId: "pantry-tracker-demo",
  storageBucket: "pantry-tracker-demo.appspot.com",
  messagingSenderId: "562027381841",
  appId: "1:562027381841:web:ef25435856eca674426470",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
