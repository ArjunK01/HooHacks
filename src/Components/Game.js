import React, { useEffect, useState, useContext } from "react";
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
import { AuthContext } from "../context/AuthProvider";
//import { ApiContext } from "../context/ApiProvider";
const Game = () => {
  let { gameID } = useParams();
  const [game, setGame] = useState();
  const [timer, setTimer] = useState(null);
  const [newestReveal, setNewestReveal] = useState();
  const [marketMaker, setMarketMaker] = useState();
  const [value, setValue] = useState([130, 150]);
  const { user } = useContext(AuthContext);
  const [userIndex, setUserIndex] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection("Games")
      .doc(gameID)
      .onSnapshot((querySnapshot) => {
        setGame(querySnapshot);
      });
  }, []);

  useEffect(() => {
    if (!game?.data()) return;
    if (game.players.length < 4) return;
    setMarketMaker(game?.data()?.players[game?.data().mm]?.name[0]);

    let keeper = -1;
    for (let i = 0; i <= 3; i++) {
      if (game?.data()?.players[i].name[1] == user.uid) {
        keeper = i;
      }
    }
    setUserIndex(keeper);

    let start = Date.now();
    console.log("SETTING MM INTERVAL");
    let refreshID = setInterval(() => {
      let delta = Date.now() - start; // milliseconds elapsed since start

      setTimer(10 - Math.floor(delta / 1000)); // in seconds
      if (delta > 10000) {
        clearInterval(refreshID);

        let t =
          game?.data()?.transactions.length > 0
            ? [...game?.data()?.transactions]
            : [];
        let something = {
          playerName: "arjun",
          makeMarket: true,
          sell: true,
          // ask: value[1],
          ask: 110,
          bid: 90,
          askSize: 5,
          // bid: value[0],
          bidSize: 5,
          quantity: 0,
          for: 0,
        };
        t.push(something);
        console.log("t", t);
        firebase
          .firestore()
          .collection("Games")
          .doc(gameID)
          .update({
            purchasing: true,
            currentMarket: {
              // ask: value[1],
              // askVolume: game?.data().currentMarket.askVolume,
              // bid: value[0],
              // bidVolume: game?.data().currentMarket.bidVolume,
              ask: 90,
              askVolume: 5,
              bid: 110,
              bidVolume: 5,
            },
            transactions: t,
          });
        return;
      }
    }, 1000);
  }, [game?.date()?.players.length, game?.data()?.mm]);

  useEffect(() => {
    if (!game?.data()) return;

    if (game?.data()?.purchasing == true) {
      let start = Date.now();
      console.log("SETTING PURCHASING INTERVAL");

      let refreshID = setInterval(() => {
        let delta = Date.now() - start; // milliseconds elapsed since start

        setTimer(5 - Math.floor(delta / 1000)); // in seconds
        if (delta > 5000) {
          clearInterval(refreshID);
          firebase
            .firestore()
            .collection("Games")
            .doc(gameID)
            .update({
              purchasing: false,
              mm: game?.data().mm == 3 ? 0 : game?.data().mm + 1,
              players:
                game?.data().mm == 3
                  ? shuffle(game?.data().players)
                  : game?.data().players,
              round:
                game?.data().mm == 3
                  ? game?.data().round + 1
                  : game?.data().round,
              revealed: revealNew(),
              currentMarket: {},
            });
          return;
        }
      }, 1000);
    }
  }, [game?.data()?.purchasing]);

  function revealNew() {
    let revealed =
      game?.data()?.revealed?.length > 0 ? [...game?.data()?.revealed] : [];
    let range = game?.data().range;
    let available = [];
    for (let i = range[0]; i <= range[1]; i++) {
      if (revealed.includes(i) == false) {
        available.push(i);
      }
    }
    let thing = available[Math.floor(Math.random() * available.length)];
    revealed.push(thing);
    return revealed;
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function buy() {
    //buying at the ask
    let price = game?.data().currentMarket.ask;
    let t = game?.data().transactions;
    let something = {
      playerName: user.name,
      makeMarket: false,
      sell: false,
      ask: 0,
      askSize: 0,
      bid: 0,
      bidSize: 0,
      quantity: 1,
      for: price,
    };
    t.push(something);

    let mmIndex = game?.data().mm;
    if (userIndex != game?.data().mm) {
      let temp = [...game?.data().players];
      temp[userIndex].money -= price;
      temp[mmIndex].money += price;
      temp[userIndex].stock += 1;
      temp[mmIndex].stock -= 1;
      firebase.firestore().collection("Games").doc(gameID).update({
        players: temp,
        transactions: t,
      });
    }
  }
  function sell() {
    //selling at the bid
    let price = game?.data().currentMarket.bid;
    let t = game?.data().transactions;
    let something = {
      playerName: user.name,
      makeMarket: false,
      sell: true,
      ask: 0,
      askSize: 0,
      bid: 0,
      bidSize: 0,
      quantity: 1,
      for: price,
    };
    t.push(something);
    let mmIndex = game?.data()?.mm;
    if (userIndex != game?.data()?.mm) {
      let temp = [...game?.data()?.players];

      temp[userIndex].money += price;
      temp[mmIndex].money -= price;
      temp[userIndex].stock -= 1;
      temp[mmIndex].stock += 1;
      firebase.firestore().collection("Games").doc(gameID).update({
        players: temp,
        transactions: t,
      });
    }
  }

  if (!game || !game.data()) return <p>loading</p>;
  if (game.data().players.length < 4) return <p>Waiting for more players</p>;

  return (
    <div>
      <HeaderText>Game 1</HeaderText>
      <h1>{timer}</h1>
      <h1>{game?.data()?.round}</h1>
      <h1>{marketMaker}</h1>
      <div style={{ height: 18 }}></div>
      <button
        onClick={() => {
          console.log("HERE");
        }}
      >
        Button
      </button>
      <Container>
        <PlayerContainer>
          {game?.data()?.players.map((p) => (
            <Player player={p} />
          ))}
        </PlayerContainer>
        <GameInfo>
          <RevealedCardsContainer>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </RevealedCardsContainer>
          <MarketContainer>
            {game?.data()?.purchasing ? (
              <Market
                onBuy={() => {
                  buy();
                }}
                onSell={() => {
                  sell();
                }}
              />
            ) : (
              <p>Waiting for market to be made</p>
            )}
          </MarketContainer>
          <MarketContainer>
            {game && game.data() && !game?.data().purchasing &&
              game?.data().mm &&
              userIndex == game?.data().mm && (
                <MarketForm value={value} setValue={setValue} />
              )}
          </MarketContainer>

          <Transactions>
            <HeaderText>transactions</HeaderText>
            <div style={{ marginBottom: 12 }}></div>
            {JSON.stringify(game?.data()?.transactions)}
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
  display: flex;
  gap: 18px;
`;
export default Game;
