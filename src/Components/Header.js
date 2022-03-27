import React, { useContext } from "react";
import styled from "styled-components";
import colors from "../Constants/Colors";
import { AuthContext } from "../context/AuthProvider";
import Button from "./Button";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Container>
      <Logo>Quazzi</Logo>
      {user && (
        <Button onClick={logout} style={{ position: "absolute", right: 0 }}>
          Sign Out
        </Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
  position: relative;
`;

const Logo = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const Btn = styled.div``;

export default Header;
