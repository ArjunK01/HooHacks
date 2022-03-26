import React, {createContext, useState, useEffect, useContext} from 'react';
import firebase from '../firebase/firebase';
//import {AuthContext} from './AuthProvider';

const ApiContext = createContext();

const ApiProvider = ({children}) => {
  const [pendingGames,setPendingGames]=useState([])
  //const {user} = useContext(AuthContext);

  

  const getPendingGames = () => {
    return firebase
      .firestore()
      .collection('PendingGames')
      .onSnapshot(querySnapshot => {
        const pendingGames = [];
        querySnapshot.forEach(documentSnapshot => {
            pendingGames.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          
        });
        setPendingGames(pendingGames);
      });
  };



  useEffect(() => {
    //if (!user) return;
    getPendingGames();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        pendingGames
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;

export {ApiContext};