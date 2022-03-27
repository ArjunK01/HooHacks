import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import styled from "styled-components";
import colors from "../Constants/Colors";
import firebase from "../firebase/firebase";
const MarketForm = ({ value, setValue, game, gameID }) => {
  const [timer, setTimer] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let start = Date.now();
    console.log("SETTING MM INTERVAL");
    let refreshID = setInterval(() => {
      let delta = Date.now() - start; // milliseconds elapsed since start

      setTimer(10 - Math.floor(delta / 1000)); // in seconds
      if (delta > 10000) {
        clearInterval(refreshID);

        let t = game > 0 ? [...game.transactions] : [];
        let something = {
          playerName: "arjun",
          makeMarket: true,
          sell: true,
          // ask: value[1],
          ask: value[1],
          bid: value[0],
          askSize: 5,
          // bid: value[0],
          bidSize: 5,
          quantity: 0,
          for: 0,
        };
        t.push(something);
        firebase
          .firestore()
          .collection("Games")
          .doc(gameID)
          .update({
            // purchasing: true,
            currentMarket: {
              ask: value[1],
              askVolume: 5,
              bid: value[0],
              bidVolume: 5,
            },
            transactions: t,
          });
        return;
      }
    }, 1000);
    return () => clearInterval(refreshID);
  }, []);
  return (
    <Container>
      Timer: {timer}
      <Row>
        <Section>
          <Label>Bid: </Label>
          <Input
            value={value[0]}
            onChange={(e) => setValue([e.target.value, value[1]])}
          />
        </Section>
        <Section>
          <Label>Ask: </Label>
          <Input
            value={value[1]}
            onChange={(e) => setValue([value[0], e.target.value])}
          />
        </Section>
        <Submit>
          Submit Market
          <svg
            style={{ height: 20, marginBottom: 2, marginLeft: 2 }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Submit>
      </Row>
      <Slider
        min={120}
        max={200}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 60px;
  height: 36px;
  border-radius: 5px;
  font-size: 24px;
  padding: 6px;
  outline: none;
  border: none;
`;
const Row = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 12px;
`;

const Label = styled.p`
  font-size: 24px;
  font-weight: 600;
`;
const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Submit = styled.div`
  font-size: 18px;
  padding: 6px 12px;
  border: 2px solid ${colors.gray600};
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;

  &:hover {
  }
`;
export default MarketForm;
