import React from "react";
import styled from "styled-components";
import colors from "../Constants/Colors";
const Player = () => {
  return (
    <Container>
      <Video></Video>
      <Info>Player</Info>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.gray};
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
  height: 144px;
`;

const Video = styled.div`
  width: 50%;
`;

const Info = styled.div`
  padding: 16px;
`;

export default Player;
