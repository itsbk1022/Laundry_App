
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0UmluL6S0b-gjSRfbjQ2KqdkWCwvi-XM",
  authDomain: "react-native-2023-bc305.firebaseapp.com",
  projectId: "react-native-2023-bc305",
  storageBucket: "react-native-2023-bc305.appspot.com",
  messagingSenderId: "1060795244978",
  appId: "1:1060795244978:web:57b91aac740c02939444ab"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};