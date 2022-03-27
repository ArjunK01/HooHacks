import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import styled from "styled-components";
import colors from "../Constants/Colors";

const MarketForm = ({ value, setValue }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Row>
        <Section>
          <Label>Bid: </Label>
          <Input
            value={value[0]}
            onChange={(e) => setValue([e.target.value, value[1]])}
          />
        </Section>
        <Section>
          <Label>Ask: </Label>
          <Input
            value={value[1]}
            onChange={(e) => setValue([value[0], e.target.value])}
          />
        </Section>
        <Submit>
          Submit Market
          <svg
            style={{ height: 20, marginBottom: 2, marginLeft: 2 }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Submit>
      </Row>
      <Slider
        min={120}
        max={200}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 60px;
  height: 36px;
  border-radius: 5px;
  font-size: 24px;
  padding: 6px;
  outline: none;
  border: none;
`;
const Row = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 12px;
`;

const Label = styled.p`
  font-size: 24px;
  font-weight: 600;
`;
const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Submit = styled.div`
  font-size: 18px;
  padding: 6px 12px;
  border: 2px solid ${colors.gray600};
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;

  &:hover {
  }
`;
export default MarketForm;
