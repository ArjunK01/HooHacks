import firebase from "firebase/compat/app"; //v9
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0TMtePXQBbWmNVpgWXChTDCzCxWEEMxA",
  authDomain: "quazzi-43f95.firebaseapp.com",
  projectId: "quazzi-43f95",
  storageBucket: "quazzi-43f95.appspot.com",
  messagingSenderId: "801010139570",
  appId: "1:801010139570:web:f10e342ac1ce5ad66ee4ab",
  measurementId: "G-X3K605TCFP",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default firebase;
