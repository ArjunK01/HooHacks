import React from "react";
import styled from "styled-components";
import colors from "../Constants/Colors";
const HeaderText = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.p`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 700;
  color: ${colors.gray400};
  letter-spacing: 1.2px;
`;
export default HeaderText;
