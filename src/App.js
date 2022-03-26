import React,{useEffect, useState} from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./Components/Header";
import firebase from "./firebase/firebase";

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
      Hello
    </SCContainer>
  );
}

const SCContainer = styled.div`
  width: 900px;
  margin: 0px auto;
`;

export default App;
