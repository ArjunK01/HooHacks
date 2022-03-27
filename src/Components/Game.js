import React,{useEffect, useState} from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Player from "./Player";
import styled from "styled-components";
import HeaderText from "./HeaderText";
import Card from "./Card";
import firebase from "../firebase/firebase";
const Game = () => {
  let {gameID}=useParams()
  const [game,setGame]=useState()
  const [round,setRound]=useState()
  useEffect(()=>{
   firebase.firestore().collection('Games').doc(gameID).get().then((doc)=>{
     setGame(doc)
   })
  },[])

  useEffect(()=>{

  },[round])

  









  return (
    <div>
      <HeaderText>Game 1</HeaderText>
      <div style={{ height: 18 }}></div>
      <Container>
        <PlayerContainer>
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
        </PlayerContainer>
        <GameInfo>
          <Card />
          <MarketContainer>Market</MarketContainer>
          <RevealedCardsContainer />
          <Transactions>Transactions</Transactions>
        </GameInfo>
      </Container>
    </div>
  );
};












const Container = styled.div`
  display: flex;
  gap: 64px;
`;

const PlayerContainer = styled.div`
  width: 80%;
`;

const GameInfo = styled.div`
  width: 100%;
`;

const Transactions = styled.div`
  border: 1px solid white;
`;

const MarketContainer = styled.div`
  border: 1px solid white;
`;

const RevealedCardsContainer = styled.div`
  border: 1px solid white;
`;
export default Game;
