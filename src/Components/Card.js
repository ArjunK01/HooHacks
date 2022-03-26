import React from "react";
import styled from "styled-components";
import colors from "../Constants/Colors";

const Card = ({ number, back }) => {
  return (
    <>
      {back ? (
        <CardContainer>50</CardContainer>
      ) : (
        <CardContainer>50</CardContainer>
      )}
    </>
  );
};

const CardContainer = styled.div`
  height: 100px;
  width: 70px;
  border-radius: 5px;
  display: grid;
  place-content: center;
  font-size: 32px;
  background-color: #cdd9e6;
  color: black;
  font-weight: 500;
`;
export default Card;
