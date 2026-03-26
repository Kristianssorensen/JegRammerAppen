// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhS_KfMC-yKba3uRjIas3IuVkUVATPm-I",
  authDomain: "informatileksamen.firebaseapp.com",
  projectId: "informatileksamen",
  storageBucket: "informatileksamen.firebasestorage.app",
  messagingSenderId: "341119591510",
  appId: "1:341119591510:web:2161199cab237711ec87f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);