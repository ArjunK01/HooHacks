import React from "react";
import styled from "styled-components";
import colors from "../Constants/Colors";
const PendingGame = ({ name }) => {
  return (
    <Container>
      <Name>Shart Game</Name>
      <Creator>Created by Rishi</Creator>
      <Players>
        <svg
          style={{ width: 30, opacity: 0.7 }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        3/4
      </Players>
      <Join>Join game</Join>
    </Container>
  );
};

const Container = styled.div`
  margin: 24px 0px;
  border: 2px solid ${colors.gray600};
  padding: 16px;
  background-color: ${colors.gray700};
  display: flex;
  border-radius: 5px;
  align-items: baseline;
`;

const Name = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const Creator = styled.p`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  opacity: 0.6;
  margin-left: 24px;
`;

const Join = styled.div`
  margin-left: auto;
  font-size: 20px;
`;
const Players = styled.div`
  display: flex;
  align-self: center;
  margin-left: 24px;
  font-size: 18px;
  align-items: center;
  gap: 6px;
`;

export default PendingGame;
