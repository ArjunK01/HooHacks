import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Logo>Quazi</Logo>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 16px;
  display: flex;
`;

const Logo = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

export default Header;
