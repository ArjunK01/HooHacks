import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import HeaderText from "../Components/HeaderText";
import PendingGame from "../Components/PendingGame";
import colors from "../Constants/Colors";
import { ApiContext } from "../context/ApiProvider";

const GamesList = () => {
  const { pendingGames, createGame, getUsers } = useContext(ApiContext);

  const [temp, setTemp] = useState([]);
  const [name, setName] = useState("");

  const [enter, setEnter] = useState(false);

  useEffect(async () => {
    let k = [];
    await getUsers().then((r) => {
      k = r;
    });
    setTemp(k);
  }, []);

  return (
    <Container>
      <GamesContainer>
        <Top>
          <HeaderText>Join a Game</HeaderText>
          {enter ? (
            <div style={{ display: "flex" }}>
              <Input />
              <Create onClick={() => createGame()}>Submit</Create>
            </div>
          ) : (
            <Create onClick={() => setEnter((e) => !e)}>Create Game</Create>
          )}
        </Top>
        <PendingGame />
        <PendingGame />
        <PendingGame />
      </GamesContainer>
      <LeaderboardContainer>
        <HeaderText>Leaderboard</HeaderText>
        <ol style={{ marginLeft: -20, marginTop: 12 }}>
          {temp
            .sort((a, b) => a.balance - b.balance)
            .map((r) => (
              <li style={{ marginBottom: 4 }}>
                <p style={{ fontSize: 20 }}>
                  {r.username} - ${r.balance}
                </p>
              </li>
            ))}
        </ol>
      </LeaderboardContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 64px;
`;

const GamesContainer = styled.div`
  width: 60%;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Create = styled.div`
  font-size: 18px;
  border: 2px solid ${colors.gray500};
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
`;
const Input = styled.input`
  width: 180px;
  margin-right: 12px;
  height: 100%;
  border-radius: 3px;
  font-size: 24px;
  padding: 6px;
  outline: none;
  border: none;
  background-color: ${colors.gray200};
`;
const LeaderboardContainer = styled.div`
  flex: 1;
`;
export default GamesList;
