import React, { createContext, useState, useEffect, useContext } from "react";
import firebase from "../firebase/firebase";
//import {AuthContext} from './AuthProvider';
import { createPendingGame } from "../Constants/Functions";

import { collection, getDocs } from "firebase/firestore";
const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [pendingGames, setPendingGames] = useState([]);
  //const {user} = useContext(AuthContext);

  const getPendingGames = () => {
    return firebase
      .firestore()
      .collection("PendingGames")
      .onSnapshot((querySnapshot) => {
        const pendingGames = [];
        querySnapshot.forEach((documentSnapshot) => {
          pendingGames.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log("PENDINGNGNNGNG", pendingGames);
        setPendingGames(pendingGames);
      });
  };

  const getUsers = async () => {
    const querySnapshot = await getDocs(
      collection(firebase.firestore(), "Users")
    );
    let temp = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push(doc.data());
    });

    return temp;
  };

  const createGame = (name) => {
    firebase
      .firestore()
      .collection("PendingGames")
      .add(createPendingGame(name, 1));
  };
  useEffect(() => {
    //if (!user) return;
    getPendingGames();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        pendingGames,
        createGame,
        getUsers,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;

export { ApiContext };
