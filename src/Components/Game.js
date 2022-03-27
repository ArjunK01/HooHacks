import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Player from "./Player";
import styled, { keyframes } from "styled-components";
import HeaderText from "./HeaderText";
import Card from "./Card";
import firebase from "../firebase/firebase";
import Market from "./Market";
import MarketForm from "./MarketForm";
import Transaction from "./Transaction";
import { AuthContext } from "../context/AuthProvider";
//import { ApiContext } from "../context/ApiProvider";
const Game = () => {
  let { gameID } = useParams();
  const [game, setGame] = useState();
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
    if(!game?.data()) return
    if (game?.data()?.players.length < 4) return;
    let keeper = -1;
    for (let i = 0; i <= 3; i++) {
      if (game?.data()?.players[i].name[1] == user.uid) {
        keeper = i;
      }
    }
    setUserIndex(keeper);
    setMarketMaker(game?.data()?.players[game?.data().mm]?.name[0]);
  }, [game]);

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

  return (
    <div>
      <HeaderText>Game 1</HeaderText>
USERINDEX{userIndex}
      <h1>{game?.data()?.round}</h1>
      <h1>{marketMaker}</h1>
      <div style={{ height: 18 }}></div>
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
            {game?.data()?.purchasing && userIndex !== game?.data().mm ? (
              <Market
                game={game.data()}
                gameID={gameID}

                onBuy={() => {
                  buy();
                }}
                onSell={() => {
                  sell();
                }}
              />
            ) : game?.data()?.purchasing ? (
              <p>Others are transacting on your market</p>
            ) : (
              <p>Waiting for market to be made</p>
            )}
          </MarketContainer>
          <MarketContainer>
            {game && game.data() && !game?.data().purchasing &&

              userIndex == game?.data().mm && (
                <MarketForm
                  value={value}
                  setValue={setValue}
                  game={game.data()}
                  gameID={gameID}
                />
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