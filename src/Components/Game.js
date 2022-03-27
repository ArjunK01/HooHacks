import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Player from "./Player";
import styled, { keyframes } from "styled-components";
import HeaderText from "./HeaderText";
import Card from "./Card";
import firebase from "../firebase/firebase";
import Market from "./Market";
import MarketForm from "./MarketForm";
import Transaction from "./Transaction";
import { selectClasses } from "@mui/material";
import {AuthContext} from "../context/AuthProvider"
//import { ApiContext } from "../context/ApiProvider";
const Game = () => {
  let { gameID } = useParams();
  const [game, setGame] = useState();
  const [timer,setTimer]=useState(null)
  const [newestReveal,setNewestReveal]=useState()
  const [marketMaker,setMarketMaker]=useState()
  const [value, setValue] = useState([130, 150]);
  const {user}=useContext(AuthContext)
  const [userIndex,setUserIndex]=useState()

  useEffect(() => {
    console.log('aqui')
    firebase
      .firestore()
      .collection("Games")
      .doc(gameID).onSnapshot((querySnapshot)=>{
          setGame(querySnapshot)
      })
      
  }, []);

  useEffect(()=>{
    console.log('detecting change')
    console.log(game?.data())
  },[game])

  useEffect(()=>{
    console.log(game?.data().players)
    setMarketMaker((game?.data().players[game?.data().mm])?.name[0])

    participants= game?.data().players
    let keeper=-1
    for(let i=0;i<=3;i++){
      if(game?.data().players[i].name[1]==user.uid){
        keeper=i
      }
    }
    setUserIndex(keeper)
    
    var start = Date.now();
    let refreshID=setInterval(()=>{
      var delta = Date.now() - start; // milliseconds elapsed since start
  
      setTimer(10-Math.floor(delta / 1000)); // in seconds
      if(delta>10000){
        clearInterval(refreshID)
        t=game?.data().transactions
        let something={
            playerName:user.name,
            makeMarket:true,
            sell:true,
            ask:value[1],
            askSize:20,
            bid:value[0],
            bidSize:20,
            quantity:0,
            for:0
        }
        t.push(something)
        firebase.firestore().collection('Games').doc(gameID).update({
          purchasing:true,
          currentMarket:{
            ask:value[1],
            askVolume:game?.data().currentMarket.askVolume,
            bid:value[0],
            bidVolume:game?.data().currentMarket.bidVolume
          },
          transactions:t
        })
      }
    },1000)
  },[game?.data().mm])

  useEffect(()=>{
    if(game?.data().purchasing==true){
    var start = Date.now();
    let refreshID=setInterval(()=>{
      var delta = Date.now() - start; // milliseconds elapsed since start
  
      setTimer(5-Math.floor(delta / 1000)); // in seconds
      if(delta>5000){
        clearInterval(refreshID)
        console.log('player balances and stock counts')
              console.log('revealing new card')
              //revealNew()
              console.log('shuffling player order')
              //if(isMarketMaker(i)){
                
                firebase.firestore().collection('Games').doc(gameID).update({
                  purchasing:false,
                  mm:game?.data().mm==3?0:game?.data().mm+1,
                  players: game?.data().mm == 3? shuffle(game?.data().players) : game?.data().players,
                  round:game?.data().mm==3?game?.data().round+1:game?.data().round,
                  revealed:revealNew()
                })
      }
    },1000)
  }


  },[game?.data().purchasing])



  function revealNew(){
    let revealed=game?.data().revealed
    let range=game?.data().range
    let available=[]
    for (let i=range[0];i<=range[1];i++){
      if (revealed.includes(i)==false){
        available.push(i)
      }
    }
    let thing=available[Math.floor(Math.random()*available.length)]
    revealed.push(thing)
    return revealed


  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function buy(){
    //buying at the ask
    price=game?.data().currentMarket.ask
    t=game?.data().transactions
        let something={
            playerName:user.name,
            makeMarket:false,
            sell:false,
            ask:0,
            askSize:0,
            bid:0,
            bidSize:0,
            quantity:1,
            for:price
        }
    t.push(something)
    
    mmIndex=game?.data().mm
    if(userIndex!=game?.data().mm){
      game?.data().players[userIndex].money-=price
      game?.data().players[mmIndex].money+=price
      game?.data().players[userIndex].stock+=1
      game?.data().players[mmIndex].stock-=1
      firebase.firestore().collection('Games').doc(gameID).update({
        players:game?.data().players,
        transactions:t
      })


    }
    

  }
  function sell(){
    //selling at the bid
    price=game?.data().currentMarket.bid
    t=game?.data().transactions
        let something={
            playerName:user.name,
            makeMarket:false,
            sell:true,
            ask:0,
            askSize:0,
            bid:0,
            bidSize:0,
            quantity:1,
            for:price
        }
    t.push(something)
    mmIndex=game?.data().mm
    if(userIndex!=game?.data().mm){
      game?.data().players[userIndex].money+=price
      game?.data().players[mmIndex].money-=price
      game?.data().players[userIndex].stock-=1
      game?.data().players[mmIndex].stock+=1
      firebase.firestore().collection('Games').doc(gameID).update({
        players:game?.data().players,
        transactions:t
      })


    }

  }

  function isMarketMaker(i){

  }

  

  return (
    <div>
      <HeaderText>Game 1</HeaderText>
      <h1>{timer}</h1>
      <h1>{game?.data().round}</h1>
      <h1>{marketMaker}</h1>
      <div style={{ height: 18 }}></div>
      <button onClick={() => {console.log("HERE")}}>Button</button>
      <Container>
        <PlayerContainer>
          <Player />
          <Player />
          <Player />
          <Player />
        </PlayerContainer>
        <GameInfo>
          <Card />
          <MarketContainer>
            <Market onBuy={() => {buy()}} onSell={() => {sell()}}/>
          </MarketContainer>
          <MarketContainer>
            <MarketForm value={value} setValue={setValue}/>
          </MarketContainer>

          <Transactions>
            <HeaderText>transactions</HeaderText>
            <div style={{ marginBottom: 12 }}></div>
            <Transaction />
            <Transaction />
            <Transaction />
          </Transactions>
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

const Transactions = styled.div``;

const MarketContainer = styled.div`
  margin: 48px 0px;
`;

const RevealedCardsContainer = styled.div`
  border: 1px solid white;
`;
export default Game;
