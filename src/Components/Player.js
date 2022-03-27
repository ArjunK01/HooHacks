import React from "react";
import styled from "styled-components";
import colors from "../Constants/Colors";
const Player = ({ player }) => {
  return (
    <Container>
      <Info>
        {player.name[0]}, {player.stock} stock, ${player.money}
      </Info>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.gray};
  border-radius: 4px;
  margin-bottom: 32px;
  display: flex;
  height: 90px;
  align-items: center;
`;

const Video = styled.div`
  width: 50%;
`;

const Info = styled.div`
  padding: 16px;
`;

export default Player;
