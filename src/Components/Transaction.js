import React from "react";
import styled from "styled-components";
import colors from "../Constants/Colors";
const Transaction = ({ t }) => {
  return (
    <Container>
      <svg
        style={{
          height: 20,
          marginBottom: 4,
          marginRight: 5,
          color: colors.gray400,
        }}
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
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <Name>Arjun bought 3 shares @ $190</Name>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  font-size: 24px;
  margin-bottom: 12px;
  align-items: center;
`;

const Name = styled.div`
  margin-bottom: 12;
`;

export default Transaction;
