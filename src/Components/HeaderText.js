import React from "react";
import styled from "styled-components";
const HeaderText = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.p`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
`;
export default HeaderText;
