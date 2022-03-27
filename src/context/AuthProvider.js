import { useState, createContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
//import "./App.css";
import { auth, } from "../firebase/firebase";
import firebase from "../firebase/firebase";
import { getBottomNavigationActionUtilityClass } from "@mui/material";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        firebase
          .firestore()
          .collection("Users")
          .doc(firebaseUser.uid)
          .get()
          .then(function (doc) {
            setUser(doc.data());
          });
      } else {
        setTimeout(() => {
          setUser(firebaseUser);
        }, 300);
      }
    });
  }, []);

  const register = async (registerEmail, registerPassword, username) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(newUser);
      firebase.firestore().collection("Users").doc(newUser.user.uid).set({
        email: newUser.user.email,
        balance: 0,
        uid: newUser.user.uid,
        username,
        currentGame: null,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (loginEmail, loginPassword) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export { AuthContext };
