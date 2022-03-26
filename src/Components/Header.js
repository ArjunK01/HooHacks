import React from "react";
import styled from "styled-components";
import colors from "../Constants/Colors";
import Button from "./Button";

const Header = () => {
  return (
    <Container>
      <Logo>Quazzi</Logo>
      <Button onClick={() => {}}>Find a game</Button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
`;

const Logo = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const Btn = styled.div``;

export default Header;
