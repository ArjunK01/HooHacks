import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./Components/Header";
import firebase from "./firebase/firebase";
import Game from "./Components/Game";
import Navigation from "./Navigation";
import ContextWrapper from "./Components/ContextWrapper";

function App() {
<<<<<<< HEAD
  const [test,setTest]=useState("")
  useEffect(async() => {
    firebase.firestore().collection("Users").doc('INtvrWH9fYNUHhq6gA4i').get().then((doc)=>{
    })
=======
  const [test, setTest] = useState("");
  useEffect(async () => {
    firebase
      .firestore()
      .collection("Users")
      .doc("INtvrWH9fYNUHhq6gA4i")
      .get()
      .then((doc) => {
        console.log("here");
        console.log(doc.data());
      });
>>>>>>> 8ced59513df34e0505013af7084365df0063cf55

    const player1 = {
      stock: 0,
      money: 0,
      card: 35,
      name: ["Cara", "ID"],
    };

<<<<<<< HEAD
    const player2={
      stock:0,
      money:0,
      card:43,
      name:['Michael','ID']
    }
    const player3={
      stock:0,
      money:0,
      card:36,
      name:['Sierra', 'ID']
    }

    const player4={
      stock:0,
      money:0,
      card:44,
      name:['Thomas','ID']
    }
=======
    const player2 = {
      stock: 0,
      money: 0,
      card: 43,
      name: ["Michael", "ID"],
    };
>>>>>>> 8ced59513df34e0505013af7084365df0063cf55

    const transaction1 = {
      playerName: "Carl",
      makeMarket: false,
      bid: 0,
      bidSize: 0,
      ask: 0,
      askSize: 0,
      sell: true,
      quantity: 5,
      for: 8,
    };

    const transaction2 = {
      playerName: "Max",
      makeMarket: true,
      bid: 8,
      bidSize: 5,
      ask: 20,
      askSize: 5,
      sell: true,
      quantity: 0,
      for: 0,
    };

    const currentMarket = {
      bid: 5,
      bidVolume: 5,
      ask: 25,
      askVolume: 20,
    };

    /*await firebase.firestore().collection('Games')
        .add({
          name: "first game",
          players: [player1,player2,player3,player4],
          round:0,
          revealed:[],
          range:[30,50],
          transactions:[transaction1, transaction2],
          currentMarket:currentMarket,
          active:true,
          mm:0,
          purchasing:false
        });*/
<<<<<<< HEAD
        
    

  },[]);
=======
  }, []);
>>>>>>> 8ced59513df34e0505013af7084365df0063cf55

  return (
    <ContextWrapper>
      <SCContainer>
        <Header />
        <Navigation />
      </SCContainer>
    </ContextWrapper>
  );
}

const SCContainer = styled.div`
  width: 1200px;
  margin: 0px auto;
`;

export default App;
