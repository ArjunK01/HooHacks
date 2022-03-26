import React,{useEffect, useState} from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./Components/Header";
import firebase from "./firebase/firebase";

function App() {
  const [test,setTest]=useState("")
  useEffect(async() => {
    firebase.firestore().collection("Users").doc('INtvrWH9fYNUHhq6gA4i').get().then((doc)=>{
      console.log('here')
      console.log(doc.data())
    })

    const player1={
      stock:0,
      money:0,
      card:35,
      name:['Cara', 'ID']
    }

    const player2={
      stock:0,
      money:0,
      card:43,
      name:['Michael','ID']
    }

    const transaction1={
      playerName:"Carl",
      makeMarket:false,
      bid:0,
      bidSize:0,
      ask:0,
      askSize:0,
      sell:true,
      quantity:5,
      for:8
    }

    const transaction2={
      playerName:"Max",
      makeMarket:true,
      bid:8,
      bidSize:5,
      ask:20,
      askSize:5,
      sell:true,
      quantity:0,
      for:0
    }

    const currentMarket={
      bid:5,
      bidVolume:5,
      ask:25,
      askVolume:20
    }

    /*await firebase.firestore().collection('Games')
        .add({
          name: "sample",
          players: [player1,player2],
          round:2,
          revealed:[36,45,49,31],
          range:[30,50],
          transactions:[transaction1,transaction2],
          currentMarket: currentMarket
        });
    */

  },[]);

  return (
    <SCContainer>
      <Header />
      Hello
    </SCContainer>
  );
}

const SCContainer = styled.div`
  width: 900px;
  margin: 0px auto;
`;

export default App;
