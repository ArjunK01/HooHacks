import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Player from "./Player";
import styled from "styled-components";
import HeaderText from "./HeaderText";
import Card from "./Card";
import firebase from "../firebase/firebase";
import Market from "./Market";
import MarketForm from "./MarketForm";
import Transaction from "./Transaction";
const Game = () => {
  let { gameID } = useParams();
  const [game, setGame] = useState();
  useEffect(() => {
    firebase
      .firestore()
      .collection("Games")
      .doc(gameID)
      .get()
      .then((doc) => {
        setGame(doc);
      });
  }, []);

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
        </PlayerContainer>
        <GameInfo>
          <Card />
          <MarketContainer>
            <Market />
          </MarketContainer>
          <MarketContainer>
            <MarketForm />
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
