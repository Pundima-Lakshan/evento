// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Use a envfile or better way to store this data

const firebaseConfig = {
  apiKey: "AIzaSyCA_a10-QIPJKMLFcSL58cTjJZkpzxLNg0",
  authDomain: "evento-react-app.firebaseapp.com",
  projectId: "evento-react-app",
  storageBucket: "evento-react-app.appspot.com",
  messagingSenderId: "183505536296",
  appId: "1:183505536296:web:d5edc70c74c93551bfbc1d",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
