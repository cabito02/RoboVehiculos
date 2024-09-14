// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIZzAxZlB2lvLys0mtN3dvha2yQwHhCUk",
  authDomain: "robovehiculo-19994.firebaseapp.com",
  databaseURL: "https://robovehiculo-19994-default-rtdb.firebaseio.com",
  projectId: "robovehiculo-19994",
  storageBucket: "robovehiculo-19994.appspot.com",
  messagingSenderId: "1075825109396",
  appId: "1:1075825109396:web:4dc2a88b57ec438b620781"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
