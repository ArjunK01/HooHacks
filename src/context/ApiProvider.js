import React, { createContext, useState, useEffect, useContext } from "react";
import firebase from "../firebase/firebase";
import {AuthContext} from './AuthProvider';
import { createPendingGame } from "../Constants/Functions";

import { collection, getDocs } from "firebase/firestore";
const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const {user} = useContext(AuthContext);
  //console.log(user.username);

  const getGames = () => {
    return firebase
      .firestore()
      .collection("Games")
      .onSnapshot((querySnapshot) => {
        const games = [];
        querySnapshot.forEach((documentSnapshot) => {
          games.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        
        setGames(games);
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

  const createGame = async (name) => {
  
      let k = await firebase.firestore().collection("Games").add({
        name:name,
        players:[{card:30,stock:0,money:0,name:[user.username,user.uid]}],
        round:0,
        revealed:[],
        range:[30,50],
        transactions:[],
        currentMarket:{},
        active:false, 
        mm:0,
        purchasing:false
      })
      return k.id
  
  };
  useEffect(() => {
    //if (!user) return;
    getGames();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        games,
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
