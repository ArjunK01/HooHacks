import React from "react";

import styled from "styled-components";
import colors from "../Constants/Colors";

const Market = () => {
  return (
    <Container>
      <MarketContainer>
        <Section>
          <SectionHeader>BID</SectionHeader>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <BigNum>90</BigNum>
            <SmallNum>x 5</SmallNum>
          </div>
        </Section>
        <Transact>Sell</Transact>
        <Transact>Buy</Transact>
        <Section>
          <SectionHeader>ASK</SectionHeader>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <BigNum>110</BigNum>
            <SmallNum>x 5</SmallNum>
          </div>
        </Section>
      </MarketContainer>
      <Maker>Arjun's Market</Maker>
    </Container>
  );
};

const Maker = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-top: -6px;
`;
const Container = styled.div``;
const MarketContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SectionHeader = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: -12px;
`;
const BigNum = styled.p`
  font-size: 48px;
  font-weight: 600;
`;

const SmallNum = styled.p`
  font-size: 32px;
  margin-left: 8px;
`;
const Transact = styled.div`
  font-size: 24px;
  margin: 0px 22px;
  background-color: ${colors.gray600};
  padding: 6px 16px;
  border-radius: 5px;
  margin-bottom: 16px;
  cursor: pointer;
`;

export default Market;
