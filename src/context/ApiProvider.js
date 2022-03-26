import React, {createContext, useState, useEffect} from 'react';
import {useContext} from 'react/cjs/react.development';
import auth from '@react-native-firebase/auth';
import {Text, View} from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import firebase from 'firebase/compat/app'; //v9
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyADl0HtxOvlHfFOdUN-PapBZjZtyCq6pnk",
    authDomain: "quazzi-acb49.firebaseapp.com",
    projectId: "quazzi-acb49",
    storageBucket: "quazzi-acb49.appspot.com",
    messagingSenderId: "28694935526",
    appId: "1:28694935526:web:8a24e2d415341f1b7f8827",
    measurementId: "G-XQ51PK0ZV0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  let first = React.useRef(true);

  const [pending, setPending] = useState(true);

  useEffect(() => {
    let unsubscribe;
    auth().onAuthStateChanged(async firebaseUser => {
      console.log('In firebase auth state change');
      setPending(true);

      if (firebaseUser) {
        let docRef = firebase
          .firestore()
          .collection('Users')
          .doc(firebaseUser.uid);

        docRef.get().then(async doc => {
          if (!doc.exists) {
            await firebase
              .firestore()
              .collection('Users')
              .doc(firebaseUser.uid)
              .set({created: true});
          }
        });

        unsubscribe = firebase
          .firestore()
          .collection('Users')
          .doc(firebaseUser.uid)
          .onSnapshot(doc => {
            console.log('USER CHANGED');
            console.log(firebaseUser.uid);
            setUser({
              ...doc.data(),
              uid: firebaseUser.uid,
              first: first.current,
            });
            console.log('heerere');
            console.log(firebaseUser.uid);
            setPending(false);
            if (doc && doc.data() && doc.data().name) first.current = false;
          });
      } else {
        if (user) unsubscribe();
        setUser(null);
        first.current = true;
        setPending(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (pending) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export {AuthContext};