import React,{useEffect, useState} from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./Components/Header";
import firebase from "./firebase/firebase";
import Game from "./Components/Game";
import Navigation from "./Navigation";

function App() {
  const [test,setTest]=useState("")
  useEffect(() => {
    firebase.firestore().collection("Users").doc('INtvrWH9fYNUHhq6gA4i').get().then((doc)=>{
      console.log('here')
      console.log(doc.data())
    })
  },[]);

  return (
    <SCContainer>
      <Header />
      <Navigation />
    </SCContainer>
  );
}

const SCContainer = styled.div`
  width: 1200px;
  margin: 0px auto;
`;

export default App;
