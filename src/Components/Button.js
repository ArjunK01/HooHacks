import React from "react";
import styled from "styled-components";
import colors from "../Constants/Colors";

const Button = ({ onClick, children, ...rest }) => {
  return (
    <Container onClick={onClick} {...rest}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${colors.gray};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;
export default Button;
