import React, { useEffect, useState } from "react";

import styled from "styled-components";
import colors from "../Constants/Colors";

const Market = ({ onBuy, onSell, game }) => {
  const [timer, setTimer] = useState(null);

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
  }, []);

  return (
    <Container>
      Timer: {timer}
      <MarketContainer>
        <Section>
          <SectionHeader>BID</SectionHeader>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <BigNum>90</BigNum>
            <SmallNum>x 5</SmallNum>
          </div>
        </Section>
        <Transact onClick={onBuy}>Sell</Transact>
        <Transact onClick={onSell}>Buy</Transact>
        <Section>
          <SectionHeader>ASK</SectionHeader>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <BigNum>110</BigNum>
            <SmallNum>x 5</SmallNum>
          </div>
        </Section>
      </MarketContainer>
      <Maker>Arjun's Market</Maker>
    </Container>
  );
};

const Maker = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-top: -6px;
`;
const Container = styled.div``;
const MarketContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SectionHeader = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: -12px;
`;
const BigNum = styled.p`
  font-size: 48px;
  font-weight: 600;
`;

const SmallNum = styled.p`
  font-size: 32px;
  margin-left: 8px;
`;
const Transact = styled.div`
  font-size: 24px;
  margin: 0px 22px;
  background-color: ${colors.gray600};
  padding: 6px 16px;
  border-radius: 5px;
  margin-bottom: 16px;
  cursor: pointer;
`;

export default Market;
